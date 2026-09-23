-- CreateTable
CREATE TABLE "Monitor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Monitor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HealthCheck" (
    "id" SERIAL NOT NULL,
    "monitorId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "healthy" BOOLEAN NOT NULL,
    "statusCode" INTEGER,
    "responseTimeMs" DOUBLE PRECISION NOT NULL,
    "error" TEXT,

    CONSTRAINT "HealthCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Monitor_enabled_idx" ON "Monitor"("enabled");

-- CreateIndex
CREATE INDEX "HealthCheck_monitorId_timestamp_idx" ON "HealthCheck"("monitorId", "timestamp");

-- AddForeignKey
ALTER TABLE "HealthCheck" ADD CONSTRAINT "HealthCheck_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "Monitor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
