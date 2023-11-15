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
        if($request->request->get('balcony')){
            $room->setRoomNumber(filter_var($request->request->get('balcony')));
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
}
