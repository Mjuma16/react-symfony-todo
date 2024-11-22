<?php

namespace App\DataFixtures;

use App\Entity\ReactTodo;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $todo= new ReactTodo();
        $todo->setName('Ali');
        $todo->setTitle('BreakFast');
        $todo->setDescription('Ali need to do his breakfast at 9:AM');
        $manager->persist($todo);

        $manager->flush();
    }
}
