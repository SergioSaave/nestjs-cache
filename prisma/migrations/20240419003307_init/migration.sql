/*
  Warnings:

  - You are about to drop the column `created_at` on the `empresas_2023` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `empresas_2023` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `empresas_2023` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `empresas_2024` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `empresas_2024` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `empresas_2024` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "idx_registros_deleted_at";

-- AlterTable
ALTER TABLE "empresas_2023" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "empresas_2024" DROP COLUMN "created_at",
DROP COLUMN "deleted_at",
DROP COLUMN "updated_at",
ALTER COLUMN "fecha_actuacion" SET DATA TYPE TEXT,
ALTER COLUMN "fecha_registro" SET DATA TYPE TEXT,
ALTER COLUMN "fecha_aprobacion_sii" SET DATA TYPE TEXT;
