-- CreateTable
CREATE TABLE "WatchList" (
    "id" INTEGER NOT NULL,
    "overview" TEXT,
    "release_date" TIMESTAMP(3),
    "runtime" INTEGER,
    "tagline" TEXT,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "imgUrl" TEXT,
    "vidUrl" TEXT,

    CONSTRAINT "WatchList_pkey" PRIMARY KEY ("id")
);
