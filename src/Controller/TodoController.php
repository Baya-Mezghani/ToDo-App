<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api/todo', name: 'api_todo')]

class TodoController extends AbstractController
{
    private $entityManager;
    private $todoRepository;

    public function __construct(EntityManagerInterface $entityManager,TodoRepository $todoRepository)
    {
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }

//read 
    #[Route('/read', name: '_read',methods:['GET'])]
    public function index()
    {
        $todos = $this->todoRepository->findAll();
        $arrayOfTodos = [];
        foreach ($todos as $todo){
            
            $arrayOfTodos[]=$todo->toArray();
        }
        return $this->json($arrayOfTodos);
    }


// create 
    #[Route('/create', name: '_create', methods:['POST'])]
    public function create(Request $request)
    {
       $content= json_decode($request->getContent());

       $todo = new Todo();

       $todo->setTask($content->task);

       try {
        $this->entityManager->persist($todo);

        $this->entityManager->flush();

        return $this->json([
            'todo'=>$todo->toArray(),
            'text' => 'Your task has been created',
            'type' => 'success',
        ]);

       }
       catch (Exception $exception) {
        return $this->json([
        'text' => 'An error occurred while creating the task.',
    ]);
        }        
}

//update 
    #[Route('/update/{id}', name: '_update', methods:['PUT'])]
    public function update(Request $request, Todo $todo)
    {
        $content=json_decode($request->getContent());

        $todo->setTask($content->task);

        try{
            $this->entityManager->flush();
            return $this->json([
                'text'=>'Task has been updated',
                'type' => 'success',

            ]);

        }catch (Exception $exception) {

            return $this->json(['text' => 'An error occurred while updating the task.']);
            }            
}

//delete 
    #[Route('/delete/{id}', name: '_delete')]
    public function delete (Todo $todo)
    {
        try {
            $this->entityManager->remove($todo); 
            $this->entityManager->flush();
            return $this->json([
                'text'=>'Task has been deleted',
                'type' => 'success',
            ]);

        } catch (Exception $exception) {
            return $this->json(['text' => 'An error occurred while deleting the task.']);
        }
    }
}

