<?php

namespace App\Controller;

use App\Entity\Client;
use App\Entity\Reservation;
use App\Entity\Room;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
#[Route('/api', name: 'hotel', methods: ['GET', 'HEAD'])]
class ReservationController extends AbstractController
{
    #[Route('/reservation', name: 'app_reservation_new', methods: ['POST'])]
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();

        $reservation = new Reservation();
        if($request->request->get('check_in_date')){
            $reservation->setCheckInDate(DateTime::createFromFormat('Y-m-d', $request->request->get('check_in_date')));
        } else {
            return $this->json("Error: check_in_date can't be empty!");
        }
        if($request->request->get('check_out_date')){
            $reservation->setCheckOutDate(DateTime::createFromFormat('Y-m-d', $request->request->get('check_out_date')));
        } else {
            return $this->json("Error: check_out_date can't be empty!");
        }
        if($request->request->get('status')){
            $reservation->setStatus($request->request->get('status'));
        } else {
            return $this->json("Error: status can't be empty!");
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
                'room' => $reservation->getRoom()
            ];

            return $this->json($data);
        } catch (\Exception $exception) {
            return $this->json("Error: " . $exception->getMessage() . "| Code: " . $exception->getCode());
        }
    }
}
