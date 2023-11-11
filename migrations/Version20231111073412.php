<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231111073412 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE room (id INT AUTO_INCREMENT NOT NULL, hotel_id_id INT NOT NULL, room_number INT NOT NULL, type VARCHAR(255) NOT NULL, cost NUMERIC(10, 0) NOT NULL, balcony TINYINT(1) NOT NULL, view_from_window VARCHAR(255) DEFAULT NULL, INDEX IDX_729F519B9C905093 (hotel_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE room ADD CONSTRAINT FK_729F519B9C905093 FOREIGN KEY (hotel_id_id) REFERENCES hotel (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_3535ED9D4E6F81 ON hotel (address)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE room DROP FOREIGN KEY FK_729F519B9C905093');
        $this->addSql('DROP TABLE room');
        $this->addSql('DROP INDEX UNIQ_3535ED9D4E6F81 ON hotel');
    }
}
