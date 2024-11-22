<?php

namespace App\Controller;

use App\Entity\ReactTodo;
use App\Form\TodoListType;
use App\Repository\ReactTodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class ApiController extends AbstractController
{
    private $todoRepository;
    private $emi;
    public function __construct(ReactTodoRepository $todoRepository, EntityManagerInterface $emi)
    {
        $this->todoRepository = $todoRepository;
        $this->emi = $emi;
    }
    //Read Operation
    #[Route('/api/todo', name: 'api_data', methods: ['GET'])]
    public function getData(): JsonResponse
    {
        $todo = $this->todoRepository->findAll();
        return $this->json(['todo' => $todo]);
    }

    //Read single data by id
    #[Route('/api/todo/{id}', name: 'single_data', methods: ['GET'])]
    public function getDataById($id): JsonResponse
    {
        // Use find instead of findOneBy for primary key lookup
        $todo = $this->todoRepository->find($id);
        if (!$todo) {
            return $this->json(['error' => 'Todo not found'], 404);
        }
        return $this->json(['todo' => $todo]);
    }

    // Create Operation
    #[Route('/api/todo/create', name: 'create_todo', methods: ['POST', 'OPTIONS'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $post = new ReactTodo();
        $post->setName($data['name']);
        $post->setTitle($data['title']);
        $post->setDescription($data['description']);
        $this->emi->persist($post);
        $this->emi->flush();
        return new JsonResponse([
            'status' => 'success',
            'message' => "Data has been created successfully!",
            'data' => $data,
        ]);
    }

    // Update Operation
    #[Route('/api/todo/update/{id}', name: 'update_todo', methods: ['PUT'])]
    public function update($id, Request $request): JsonResponse
    {
        $todo = $this->todoRepository->find($id);
        if (!$todo) {
            return new JsonResponse([
                'status' => false,
                'message' => 'Todo not found'
            ]);
        }

        $data = json_decode($request->getContent(), true);

        $todo->setName($data['name'] ?? $todo->getName());
        $todo->setTitle($data['title'] ?? $todo->getTitle());
        $todo->setDescription($data['description'] ?? $todo->getDescription());

        $this->emi->flush();

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Todo updated successfully!',
            'data' => [
                'id' => $todo->getId(),
                'name' => $todo->getName(),
                'title' => $todo->getTitle(),
                'description' => $todo->getDescription(),
            ],
        ]);
    }


    // Delete Operation
    #[Route('/api/todo/delete/{id}', methods: ['DELETE'])]
    public function delete($id): JsonResponse
    {
        $post = $this->todoRepository->find($id);

        if (!$post) {
            return new JsonResponse(['status' => 'todo not found!'], 404);
        }

        $this->emi->remove($post);
        $this->emi->flush();

        return new JsonResponse([
            'status' => 'success',
            'message' => 'Todo has been deleted successfully!'
        ]);
    }
}
