<?php

namespace App\Controller;

use App\Entity\Client;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api', name: 'user')]
class UserController extends AbstractController
{
    #[Route('/user', name: 'app_user', methods: ['GET', 'HEAD'])]
    public function index(ManagerRegistry $doctrine): Response
    {
        $clients = $doctrine
            ->getRepository(Client::class)
            ->findAll();

        $data = [];

        foreach ($clients as $client) {
            $data[] = [
                'id' => $client->getId(),
                'name' => $client->getName(),
                'contact_info' => $client->getContactInfo(),
                'email' => $client->getEmail(),
//                'password' => $client->getPassword(),
            ];
        }


        return $this->json($data);
    }

    #[Route('/user', name: 'app_user_new', methods: ['POST'])]
    public function new(ManagerRegistry $doctrine, UserPasswordHasherInterface $passwordHasher, Request $request): Response
    {
        $entityManager = $doctrine->getManager();

        $client = new Client();
        $request->request->get('name') ? $client->setName($request->request->get('name')) : $client->setName("Guest");
        $request->request->get('contact_info') ? $client->setContactInfo($request->request->get('contact_info')) : $client->setContactInfo("");

        $client->setEmail($request->request->get('email'));

        $plaintextPassword = $request->request->get('password');
        $hashedPassword = $passwordHasher->hashPassword(
            $client,
            $plaintextPassword
        );

        $client->setPassword($hashedPassword);
        try {
            $entityManager->persist($client);
            $entityManager->flush();

            $data =  [
                'id' => $client->getId(),
                'name' => $client->getName(),
                'contact_info' => $client->getContactInfo(),
                'email' => $client->getEmail(),
            ];

            return $this->json($data);
        } catch (\Exception $exception) {
            return $this->json("Error: " . $exception->getMessage() . "| Code: " . $exception->getCode());
        }
    }

    #[Route('/user/{id}', name: 'app_user_get', methods: ['GET'])]
    public function show(ManagerRegistry $doctrine, int $id): Response
    {
        $client = $doctrine->getRepository(Client::class)->find($id);

        if (!$client) {

            return $this->json('No user found for id ' . $id, 404);
        }

        $data =  [
            'id' => $client->getId(),
            'name' => $client->getName(),
            'contact_info' => $client->getContactInfo(),
            'email' => $client->getEmail(),
        ];

        return $this->json($data);
    }

    #[Route('/user/{id}', name: 'app_user_edit', methods: ['PUT', 'PATCH'])]
    public function edit(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $client = $entityManager->getRepository(Client::class)->find($id);

        if (!$client) {
            return $this->json('No user found for id' . $id, 404);
        }

        $content = json_decode($request->getContent());
        $client->setName($content->name);
        $client->setEmail($content->email);
        $client->setContactInfo($content->contact_info);

        $entityManager->flush();

        $data =  [
            'id' => $client->getId(),
            'name' => $client->getName(),
            'contact_info' => $client->getContactInfo(),
            'email' => $client->getEmail(),
        ];

        return $this->json($data);
    }

    #[Route('/user/{id}', name: 'app_user_delete', methods: ['DELETE'])]
    public function delete(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $client = $entityManager->getRepository(Client::class)->find($id);

        if (!$client) {
            return $this->json('No client found for id' . $id, 404);
        }

        $entityManager->remove($client);
        $entityManager->flush();

        return $this->json('Deleted a client successfully with id ' . $id);
    }

    #[Route('/user/auth', name: 'app_user_auth', methods: ['POST'])]
    public function auth(ManagerRegistry $doctrine, UserPasswordHasherInterface $passwordHasher, Request $request): Response
    {
        $entityManager = $doctrine->getManager();
        $client = $entityManager->getRepository(Client::class)->findOneBy(['email'=>($request->request->get('email'))]);

        if (!$client) {
            return $this->json('No client found!', 204);
        }

        $plaintextPassword = $request->request->get('password');

        if (!$passwordHasher->isPasswordValid($client, $plaintextPassword)) {
            return $this->json('Access denied!', 403);
        }

        $data =  [
            'id' => $client->getId(),
            'name' => $client->getName(),
            'contact_info' => $client->getContactInfo(),
            'email' => $client->getEmail(),
        ];

        return $this->json($data);
    }
}
