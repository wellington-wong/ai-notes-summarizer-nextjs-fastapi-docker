-- CreateTable
CREATE TABLE "SystemMetric" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cpuUsagePercent" DOUBLE PRECISION NOT NULL,
    "memoryUsagePercent" DOUBLE PRECISION NOT NULL,
    "diskUsagePercent" DOUBLE PRECISION NOT NULL,
    "uptimeSeconds" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SystemMetric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContainerMetric" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "containerId" TEXT NOT NULL,
    "containerName" TEXT NOT NULL,
    "cpuUsagePercent" DOUBLE PRECISION NOT NULL,
    "memoryUsageBytes" BIGINT NOT NULL,
    "memoryLimitBytes" BIGINT NOT NULL,

    CONSTRAINT "ContainerMetric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SystemMetric_timestamp_idx" ON "SystemMetric"("timestamp");

-- CreateIndex
CREATE INDEX "ContainerMetric_containerId_timestamp_idx" ON "ContainerMetric"("containerId", "timestamp");
