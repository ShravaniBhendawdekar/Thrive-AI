/*
  Warnings:

  - The `rating` column on the `UserAnswer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "UserAnswer" DROP COLUMN "rating",
ADD COLUMN     "rating" INTEGER;
