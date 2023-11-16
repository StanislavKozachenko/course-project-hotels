<?php

namespace App\Controller;

use App\Entity\Hotel;
use App\Entity\Room;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
#[Route('/api', name: 'hotel', methods: ['GET', 'HEAD'])]
class RoomController extends AbstractController
{
    #[Route('/room', name: 'app_room')]
    public function index(ManagerRegistry $doctrine): Response
    {
        $rooms = $doctrine
            ->getRepository(Room::class)
            ->findAll();

        $data = [];

        foreach ($rooms as $room) {
            $data[] = [
                'id' => $room->getId(),
                'hotel' => $room->getHotel(),
                'cost' => $room->getCost(),
                'room_number' => $room->getRoomNumber(),
                'type' => $room->getType(),
                'view_from_window' => $room->getViewFromWindow(),
                'balcony' => $room->isBalcony(),
            ];
        }


        return $this->json($data);
    }
    #[Route('/room', name: 'app_room_new', methods: ['POST'])]
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();

        $room = new Room();
        $request->request->get('view_from_window') ? $room->setViewFromWindow($request->request->get('view_from_window')) : $room->setViewFromWindow("");
        if($request->request->get('room_number')){
            $room->setRoomNumber($request->request->get('room_number'));
        } else {
            return $this->json("Error: room_number can't be empty!");
        }
        if($request->request->get('balcony') === "true"){
            $room->setBalcony(true);
        } else if ($request->request->get('balcony') === "false"){
            $room->setBalcony(false);
        } else {
            return $this->json("Error: balcony can't be empty!");
        }
        $fields = ['type', 'cost'];

        foreach ($fields as $field) {
            $value = $request->request->get($field);

            if ($value !== null) {
                $setter = 'set' . ucfirst($field);
                $room->$setter($value);
            } else {
                return $this->json("Error: $field can't be empty!");
            }
        }
        try {
            if($request->request->get('hotel_id')){
                $hotel = $doctrine->getRepository(Hotel::class)->find($request->request->get('hotel_id'));
                if (!$hotel) {
                    return $this->json('No hotel found for id ' . $request->request->get('hotel_id'), 404);
                } else {
                    $hotel->addRoom($room);

                    $entityManager->persist($room);
                    $entityManager->flush();

                    $entityManager->persist($hotel);
                    $entityManager->flush();

                    $data =  [
                        'id' => $room->getId(),
                        'hotel' => $room->getHotel(),
                        'cost' => $room->getCost(),
                        'room_number' => $room->getRoomNumber(),
                        'type' => $room->getType(),
                        'view_from_window' => $room->getViewFromWindow(),
                        'balcony' => $room->isBalcony(),
                    ];
                    return $this->json($data);
                }
            } else {
                return $this->json("Error: hotel_id can't be empty!");
            }

        } catch (\Exception $exception) {
            return $this->json("Error: " . $exception->getMessage() . "| Code: " . $exception->getCode());
        }
    }
    #[Route('/room/{id}', name: 'app_room_update', methods: ['PUT', 'PATCH'])]
    public function update(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $room = $entityManager->getRepository(Room::class)->find($id);

        if (!$room) {
            return $this->json('No room found for id ' . $id, 404);
        }

        $content = json_decode($request->getContent());

        if(isset($content->hotel_id)){
            $hotel = $entityManager->getRepository(Hotel::class)->find($content->hotel_id);

            if (!$hotel) {
                return $this->json('No hotel found for id ' . $id, 404);
            }
            $room->setHotel($hotel);
        }
        if(isset($content->room_number)){
            $room->setRoomNumber($content->room_number);
        }
        if(isset($content->view_from_window)){
            $room->setViewFromWindow($content->view_from_window);
        }
        $fields = ['cost', 'type', 'balcony'];

        foreach ($fields as $field) {
            if(isset($content->$field)) {
                $value = $content->$field;
                $setter = 'set' . ucfirst($field);
                $room->$setter($value);
            }
        }

        try {
            $entityManager->flush();

            $data =  [
                'id' => $room->getId(),
                'hotel' => $room->getHotel(),
                'cost' => $room->getCost(),
                'room_number' => $room->getRoomNumber(),
                'type' => $room->getType(),
                'view_from_window' => $room->getViewFromWindow(),
                'balcony' => $room->isBalcony(),
            ];

            return $this->json($data);
        } catch (\Exception $exception) {
            return $this->json("Error: " . $exception->getMessage() . "| Code: " . $exception->getCode());
        }
    }

    #[Route('/room/{id}', name: 'app_room_delete', methods: ['DELETE'])]
    public function delete(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $room = $entityManager->getRepository(Room::class)->find($id);

        if (!$room) {
            return $this->json('No room found for id ' . $id, 404);
        }
        try {
            $entityManager->remove($room);
            $entityManager->flush();

            return $this->json('Deleted a room successfully with id ' . $id);
        } catch (\Exception $exception) {
            return $this->json("Error: " . $exception->getMessage() . "| Code: " . $exception->getCode());
        }
    }
}
