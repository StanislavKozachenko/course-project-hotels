<?php

namespace App\Shared\Security;

interface UserFetcherInterface
{
    public function getAuthUser(): AuthUserInterface;
}