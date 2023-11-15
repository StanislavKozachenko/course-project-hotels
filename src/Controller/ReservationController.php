<?php

namespace App\Controller;

use App\Entity\Client;
use App\Entity\Reservation;
use App\Entity\Room;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
#[Route('/api', name: 'hotel', methods: ['GET', 'HEAD'])]
class ReservationController extends AbstractController
{
    #[Route('/reservation', name: 'app_reservation',  methods: ['GET, HEAD'])]
    public function index(ManagerRegistry $doctrine): Response
    {
        $reservations = $doctrine
            ->getRepository(Reservation::class)
            ->findAll();

        $data = [];

        foreach ($reservations as $reservation) {
            $data[] = [
                'id' => $reservation->getId(),
                'status' => $reservation->getStatus(),
                'check_in_date' => $reservation->getCheckInDate(),
                'check_out_date' => $reservation->getCheckOutDate(),
                'client' => $reservation->getClient(),
                'total_cost' => $reservation->getTotalCost(),
                'room' => $reservation->getRoom(),
                'order_date' => $reservation->getOrderDate()
            ];
        }


        return $this->json($data);
    }

    /**
     * @throws Exception
     */
    #[Route('/reservation', name: 'app_reservation_new', methods: ['POST'])]
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();

        $reservation = new Reservation();
        $reservation->setOrderDate(new DateTime());
        if($request->request->get('check_in_date')){
            $reservation->setCheckInDate(new DateTime($request->request->get('check_in_date')));
        } else {
            return $this->json("Error: check_in_date can't be empty!");
        }
        if($request->request->get('check_out_date')){
            $reservation->setCheckOutDate(new DateTime($request->request->get('check_out_date')));
        } else {
            return $this->json("Error: check_out_date can't be empty!");
        }
        if($request->request->get('status')){
            $reservation->setStatus($request->request->get('status'));
        } else {
            return $this->json("Error: status can't be empty!");
        }
        if($request->request->get('total_cost')){
            $reservation->setTotalCost($request->request->get('total_cost'));
        } else {
            return $this->json("Error: total_cost can't be empty!");
        }
        if($request->request->get('client_id')){
            $client = $doctrine->getRepository(Client::class)->find($request->request->get('client_id'));
            if (!$client) {
                return $this->json('No client found for id ' . $request->request->get('client_id'), 404);
            } else {
                $reservation->setClient($client);
            }
        } else {
            return $this->json("Error: client_id can't be empty!");
        }
        if($request->request->get('room_id')){
            $room = $doctrine->getRepository(Room::class)->find($request->request->get('room_id'));
            if (!$room) {
                return $this->json('No room found for id ' . $request->request->get('room_id'), 404);
            } else {
                $reservation->setRoom($room);
            }
        } else {
            return $this->json("Error: room_id can't be empty!");
        }
        try {
            $entityManager->persist($reservation);
            $entityManager->flush();

            $data =  [
                'id' => $reservation->getId(),
                'status' => $reservation->getStatus(),
                'check_in_date' => $reservation->getCheckInDate(),
                'check_out_date' => $reservation->getCheckOutDate(),
                'client' => $reservation->getClient(),
                'total_cost' => $reservation->getTotalCost(),
                'room' => $reservation->getRoom(),
                'order_date' => $reservation->getOrderDate()
            ];

            return $this->json($data);
        } catch (Exception $exception) {
            return $this->json("Error: " . $exception->getMessage() . "| Code: " . $exception->getCode());
        }
    }
    #[Route('/reservation/user/{id}', name: 'get_user_reservation',  methods: ['GET, HEAD'])]
    public function getByUser(ManagerRegistry $doctrine, int $id): Response
    {
        $client = $doctrine
            ->getRepository(Client::class)
            ->find($id);

        if(!$client) {
            return $this->json('No user found for id ' . $id, 404);
        }

        $reservations = $doctrine
            ->getRepository(Reservation::class)
            ->findBy(array('client'=>$client));

        if(!$reservations) {
            return $this->json('No reservations found for user id ' . $id, 404);
        }

        $data = [];

        foreach ($reservations as $reservation) {
            $data[] = [
                'id' => $reservation->getId(),
                'status' => $reservation->getStatus(),
                'check_in_date' => $reservation->getCheckInDate(),
                'check_out_date' => $reservation->getCheckOutDate(),
                'client' => $reservation->getClient(),
                'total_cost' => $reservation->getTotalCost(),
                'room' => $reservation->getRoom(),
                'order_date' => $reservation->getOrderDate()
            ];
        }


        return $this->json($data);
    }
    #[Route('/reservation/{id}', name: 'purchase_reservation',  methods: ['PUT'])]
    public function purchase(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $reservation = $doctrine
            ->getRepository(Reservation::class)
            ->find($id);

        if(!$reservation) {
            return $this->json('No reservation found for id ' . $id, 404);
        }
        $reservation->setStatus('success');

        try {
            $entityManager->persist($reservation);
            $entityManager->flush();

            $data =  [
                'id' => $reservation->getId(),
                'status' => $reservation->getStatus(),
                'check_in_date' => $reservation->getCheckInDate(),
                'check_out_date' => $reservation->getCheckOutDate(),
                'client' => $reservation->getClient(),
                'total_cost' => $reservation->getTotalCost(),
                'room' => $reservation->getRoom(),
                'order_date' => $reservation->getOrderDate()
            ];

            return $this->json($data);
        } catch (Exception $exception) {
            return $this->json("Error: " . $exception->getMessage() . "| Code: " . $exception->getCode());
        }
    }
    #[Route('/reservation/{id}/remove', name: 'app_reservation_delete', methods: ['DELETE'])]
    public function delete(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $reservation = $entityManager->getRepository(Reservation::class)->find($id);

        if (!$reservation) {
            return $this->json('No reservation found for id' . $id, 404);
        }
        try {
            $entityManager->remove($reservation);

            $entityManager->flush();

            return $this->json('Deleted a reservation successfully with id ' . $id);
        } catch (Exception $exception) {
            return $this->json("Error: " . $exception->getMessage() . "| Code: " . $exception->getCode());
        }
    }

    /**
     * @throws Exception
     */
    #[Route('/reservations/find', name: 'get_date_reservation',  methods: ['POST'])]
    public function getByDateTime(ManagerRegistry $doctrine, Request $request): Response
    {
        $reservations = null;
        if ($request->request->get('find_date_from') && $request->request->get('find_date_to')) {
            $findDateFrom = $request->request->get('find_date_from');
            $findDateTo = $request->request->get('find_date_to');

            $reservations = $doctrine
                ->getRepository(Reservation::class)
                ->createQueryBuilder('r')
                ->where('r.order_date >= :findDateFrom')
                ->andWhere('r.order_date <= :findDateTo')
                ->setParameter('findDateFrom', $findDateFrom)
                ->setParameter('findDateTo', $findDateTo)
                ->getQuery()
                ->getResult();
        }


        if(!$reservations) {
            return $this->json('No reservations found' , 404);
        }

        $data = [];

        foreach ($reservations as $reservation) {
            $data[] = [
                'id' => $reservation->getId(),
                'status' => $reservation->getStatus(),
                'check_in_date' => $reservation->getCheckInDate(),
                'check_out_date' => $reservation->getCheckOutDate(),
                'client' => $reservation->getClient(),
                'total_cost' => $reservation->getTotalCost(),
                'room' => $reservation->getRoom(),
                'order_date' => $reservation->getOrderDate()
            ];
        }


        return $this->json($data);
    }
}
