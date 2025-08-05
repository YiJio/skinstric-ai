-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "gallery" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Demographics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "age" JSONB NOT NULL,
    "gender" JSONB NOT NULL,
    "race" JSONB NOT NULL,

    CONSTRAINT "Demographics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Demographics_userId_key" ON "public"."Demographics"("userId");

-- AddForeignKey
ALTER TABLE "public"."Demographics" ADD CONSTRAINT "Demographics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
