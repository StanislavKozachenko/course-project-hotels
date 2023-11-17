<?php

namespace App\Controller;

use App\Entity\Client;
use App\Entity\Hotel;
use App\Entity\Review;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
#[Route('/api', name: 'hotel', methods: ['GET', 'HEAD'])]
class ReviewController extends AbstractController
{
    #[Route('/review', name: 'app_review')]
    public function index(ManagerRegistry $doctrine): Response
    {
        $reviews = $doctrine
            ->getRepository(Review::class)
            ->findAll();

        $data = [];

        foreach ($reviews as $review) {
            $data[] = [
                'id' => $review->getId(),
                'review_date' => $review->getReviewDate(),
                'client' => $review->getClient(),
                'hotel' => $review->getHotel(),
                'review_text' => $review->getReviewText(),
                'rating' => $review->getRating(),
            ];
        }

        return $this->json($data);
    }
    #[Route('/review', name: 'app_review_new', methods: ['POST'])]
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();

        $review = new Review();
        $request->request->get('review_date') ? $review->setReviewDate($request->request->get('review_date')) : $review->setReviewDate(new \DateTime());
        if($request->request->get('review_text')){
            $review->setReviewText($request->request->get('review_text'));
        } else {
            return $this->json("Error: review_text can't be empty!");
        }

        $fields = ['rating'];
        foreach ($fields as $field) {
            $value = $request->request->get($field);

            if ($value !== null) {
                $setter = 'set' . ucfirst($field);
                $review->$setter($value);
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
                    $client = $doctrine->getRepository(Client::class)->find($request->request->get('client_id'));
                    if (!$client) {
                        return $this->json('No client found for id ' . $request->request->get('client_id'), 404);
                    }
                    $review->setHotel($hotel);
                    $review->setClient($client);

                    $entityManager->persist($review);
                    $entityManager->flush();

                    $data =  [
                        'id' => $review->getId(),
                        'review_date' => $review->getReviewDate(),
                        'client' => $review->getClient(),
                        'hotel' => $review->getHotel(),
                        'review_text' => $review->getReviewText(),
                        'rating' => $review->getRating(),
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
    #[Route('/review/hotel/{id}', name: 'get_hotel_reviews')]
    public function getHotelReviews(ManagerRegistry $doctrine, int $id): Response
    {
        $hotel = $doctrine->getRepository(Hotel::class)->find($id);
        if (!$hotel) {
            return $this->json('No hotel found for id ' . $id, 404);
        }
        $reviews = $doctrine
            ->getRepository(Review::class)
            ->findBy(array('hotel'=>$hotel));

        $data = [];

        foreach ($reviews as $review) {
            $data[] = [
                'id' => $review->getId(),
                'review_date' => $review->getReviewDate(),
                'client' => $review->getClient(),
                'hotel' => $review->getHotel(),
                'review_text' => $review->getReviewText(),
                'rating' => $review->getRating(),
            ];
        }

        return $this->json($data);
    }
}
