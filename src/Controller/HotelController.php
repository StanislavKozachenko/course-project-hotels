<?php

namespace App\Controller;

use App\Entity\Hotel;
use App\Entity\Reservation;
use App\Entity\Room;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api', name: 'hotel', methods: ['GET', 'HEAD'])]
class HotelController extends AbstractController
{
    #[Route('/hotel', name: 'app_hotel')]
    public function index(ManagerRegistry $doctrine): Response
    {
        $hotels = $doctrine
            ->getRepository(Hotel::class)
            ->findAll();

        $data = [];

        foreach ($hotels as $hotel) {
            $data[] = [
                'id' => $hotel->getId(),
                'name' => $hotel->getName(),
                'description' => $hotel->getDescription(),
                'address' => $hotel->getAddress(),
                'category' => $hotel->getCategory(),
                'imageUrl' => $hotel->getImageUrl(),
                'rating' => $hotel->getRating(),
                'room_count' => $hotel->getRoomsCount(),
            ];
        }


        return $this->json($data);
    }
    #[Route('/hotel', name: 'app_hotel_new', methods: ['POST'])]
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();

        $hotel = new Hotel();
        $request->request->get('description') ? $hotel->setDescription($request->request->get('description')) : $hotel->setDescription("");

        $fields = ['name', 'address', 'category', 'imageUrl', 'rating'];

        foreach ($fields as $field) {
            $value = $request->request->get($field);

            if ($value !== null) {
                $setter = 'set' . ucfirst($field);
                $hotel->$setter($value);
            } else {
                return $this->json("Error: $field can't be empty!");
            }
        }

        try {
            $entityManager->persist($hotel);
            $entityManager->flush();

            $data =  [
                'id' => $hotel->getId(),
                'name' => $hotel->getName(),
                'address' => $hotel->getAddress(),
                'description' => $hotel->getDescription(),
                'rating' => $hotel->getRating(),
                'room_count' => $hotel->getRoomsCount(),
                'imageUrl' => $hotel->getImageUrl(),
                'category' => $hotel->getCategory(),
            ];

            return $this->json($data);
        } catch (\Exception $exception) {
            return $this->json("Error: " . $exception->getMessage() . "| Code: " . $exception->getCode());
        }
    }
    #[Route('/hotel/{id}', name: 'app_hotel_get', methods: ['GET'])]
    public function show(ManagerRegistry $doctrine, int $id): Response
    {
        $hotel = $doctrine->getRepository(Hotel::class)->find($id);

        if (!$hotel) {

            return $this->json('No hotel found for id ' . $id, 404);
        }

        $data =  [
            'id' => $hotel->getId(),
            'name' => $hotel->getName(),
            'address' => $hotel->getAddress(),
            'description' => $hotel->getDescription(),
            'rating' => $hotel->getRating(),
            'room_count' => $hotel->getRoomsCount(),
            'imageUrl' => $hotel->getImageUrl(),
            'category' => $hotel->getCategory(),
        ];

        return $this->json($data);
    }

    #[Route('/hotel/{id}', name: 'app_hotel_edit', methods: ['PUT', 'PATCH'])]
    public function edit(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $hotel = $entityManager->getRepository(Hotel::class)->find($id);

        if (!$hotel) {
            return $this->json('No hotel found for id ' . $id, 404);
        }

        $content = json_decode($request->getContent());

        //        if(isset($content->room_count)){
        //            $hotel->setRoomCount($content->room_count);
        //        }
        if(isset($content->description)){
            $hotel->setDescription($content->description);
        }
        $fields = ['name', 'address', 'category', 'imageUrl', 'rating'];

        foreach ($fields as $field) {
            if(isset($content->$field)) {
                $value = $content->$field;
                $setter = 'set' . ucfirst($field);
                $hotel->$setter($value);
            }
            //else {
            //    return $this->json("Error: $field can't be empty!");
            //}
        }

        try {
            $entityManager->flush();

            $data =  [
                'id' => $hotel->getId(),
                'name' => $hotel->getName(),
                'address' => $hotel->getAddress(),
                'description' => $hotel->getDescription(),
                'rating' => $hotel->getRating(),
                'room_count' => $hotel->getRoomsCount(),
                'imageUrl' => $hotel->getImageUrl(),
                'category' => $hotel->getCategory(),
            ];

            return $this->json($data);
        } catch (\Exception $exception) {
            return $this->json("Error: " . $exception->getMessage() . "| Code: " . $exception->getCode());
        }
    }

    #[Route('/hotel/{id}', name: 'app_hotel_delete', methods: ['DELETE'])]
    public function delete(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $client = $entityManager->getRepository(Hotel::class)->find($id);

        if (!$client) {
            return $this->json('No hotel found for id ' . $id, 404);
        }

        $entityManager->remove($client);
        $entityManager->flush();

        return $this->json('Deleted a hotel successfully with id ' . $id);
    }

    #[Route('/hotels/filter', name: 'app_hotel_filter', methods: ['GET'])]
    public function filter(ManagerRegistry $doctrine, Request $request): Response
    {
        $findCriteria = [];
        $sortCriteria = [];
        if($request->get('name') !== null) {
            $findCriteria += ['name'=>$request->get('name')];
        }
        if($request->get('category') !== "All") {
            $findCriteria += ['category'=>$request->get('category')];
        }
        if($request->get('sortType') !== null) {
            $sortCriteria += [$request->get('sortType')=>'DESC'];
        }
        $hotels = $doctrine->getRepository(Hotel::class)->findBy(criteria: $findCriteria, orderBy: $sortCriteria, limit: $request->get('limit'), offset: $request->get('limit') * ($request->get('page')-1));

        if (!$hotels) {

            //return $this->json('No hotels found for criteria ' , 404);
            return $this->json([]);
        }

        return $this->json($hotels);
    }
    #[Route('/hotel/{id}/rooms', name: 'app_hotel_get', methods: ['GET'])]
    public function showRooms(ManagerRegistry $doctrine, int $id): Response
    {
        $hotel = $doctrine->getRepository(Hotel::class)->find($id);

        if (!$hotel) {

            return $this->json('No hotel found for id ' . $id, 404);
        }

        $rooms = $doctrine->getRepository(Room::class)->findBy(array("hotel"=>$hotel));

        $data = [];

        foreach ($rooms as $room) {
            $result = $doctrine->getRepository(Reservation::class)->findBy(array('room'=>$room));
            if(!$result) {
                $data[] = [
                    'id' => $room->getId(),
                    'hotel' => $room->getHotel(),
                    'cost' => $room->getCost(),
                    'room_number' => $room->getRoomNumber(),
                    'type' => $room->getType(),
                    'view_from_window' => $room->getViewFromWindow(),
                    'balcony' => $room->isBalcony(),
                    'status'=>false
                ];
            } else {
                $data[] = [
                    'id' => $room->getId(),
                    'hotel' => $room->getHotel(),
                    'cost' => $room->getCost(),
                    'room_number' => $room->getRoomNumber(),
                    'type' => $room->getType(),
                    'view_from_window' => $room->getViewFromWindow(),
                    'balcony' => $room->isBalcony(),
                    'status'=>true
                ];
            }
        }

        return $this->json($data);
    }
}
