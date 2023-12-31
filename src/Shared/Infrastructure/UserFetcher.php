<?php

namespace App\Shared\Infrastructure;

use App\Shared\Security\AuthUserInterface;
use App\Shared\Security\UserFetcherInterface;
use Symfony\Component\Security\Core\Security;
use Webmozart\Assert\Assert;

class UserFetcher implements UserFetcherInterface
{

    public function __construct(private readonly Security $security)
    {
    }

    public function getAuthUser(): AuthUserInterface
    {
        /** @var AuthUserInterface $user */
        $user = $this->security->getUser();

        Assert::notNull($user, 'Current user not found check security access list');
        Assert::isInstanceOf($user, AuthUserInterface::class, sprintf('Invalid user type %s', \get_class($user)));

        return $user;
    }
}