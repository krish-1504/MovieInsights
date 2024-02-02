-- CreateTable
CREATE TABLE "Movie" (
    "id" INTEGER NOT NULL,
    "overview" TEXT,
    "release_date" TIMESTAMP(3),
    "runtime" INTEGER,
    "tagline" TEXT,
    "title" TEXT NOT NULL,
    "status" TEXT,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
