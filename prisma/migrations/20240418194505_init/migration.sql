-- CreateTable
CREATE TABLE "empresas_2023" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "deleted_at" TIMESTAMPTZ(6),
    "rut" TEXT,
    "razon_social" TEXT,
    "fecha_actuacion" TEXT,
    "fecha_registro" TEXT,
    "fecha_aprobacion_sii" TEXT,
    "anio" INTEGER,
    "mes" TEXT,
    "comuna_tributaria" TEXT,
    "region_tributaria" INTEGER,
    "codigo_sociedad" TEXT,
    "tipo_actuacion" TEXT,
    "capital" BIGINT,
    "comuna_social" TEXT,
    "region_social" INTEGER,

    CONSTRAINT "registros_pkey2" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empresas_2024" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),
    "deleted_at" TIMESTAMPTZ(6),
    "rut" TEXT,
    "razon_social" TEXT,
    "fecha_actuacion" DATE,
    "fecha_registro" DATE,
    "fecha_aprobacion_sii" DATE,
    "anio" INTEGER,
    "mes" TEXT,
    "comuna_tributaria" TEXT,
    "region_tributaria" INTEGER,
    "codigo_sociedad" TEXT,
    "tipo_actuacion" TEXT,
    "capital" BIGINT,
    "comuna_social" TEXT,
    "region_social" INTEGER,

    CONSTRAINT "registros_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_registros_deleted_at" ON "empresas_2024"("deleted_at");
