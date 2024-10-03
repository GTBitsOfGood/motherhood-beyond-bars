import ArrowUpIcon from "@components/Icons/LeftChevronIcon copy";
import { UseMapWrapper } from "@lib/hooks/useMap";
import { monthIndexToString } from "@lib/utils/date";
import Image from "next/image";
import { useRouter } from "next/router";
import { BabyBookYear, BabyImage } from "pages/admin/book/[babyId]";
import React, { useEffect, useRef, useState } from "react";

const selectedForDownloadKey = (i: number, j: number, k: number) =>
  `${i}${j}${k}`;

const PictureArray = ({ babyBook, select, selectedForDownload }: Props) => {
  const router = useRouter();
  const wrapper = useRef<HTMLDivElement>(null);
  const [showToTop, setShowToTop] = useState(false);
  const refs = useRef(
    babyBook.map((year) =>
      year.months.map((_) => React.createRef<HTMLDivElement>())
    )
  );

  useEffect(() => {
    const onHashChange = (
      url = window.location.pathname + window.location.hash
    ) => {
      const hash = url.substring(url.indexOf("#") + 1);
      const [year, month] = hash.split(".");
      if (month === undefined) return;
      const yearNumber = parseInt(year);
      const monthNumber = parseInt(month);
      if (
        isNaN(yearNumber) ||
        isNaN(monthNumber) ||
        monthNumber < 0 ||
        monthNumber > 11
      )
        return;
      for (let i = 0; i < babyBook.length; i++) {
        if (babyBook[i].year === yearNumber) {
          const months = babyBook[i].months;
          for (let j = 0; j < months.length; j++) {
            if (monthNumber === months[j].month) {
              refs.current[i][j].current?.scrollIntoView();
            }
          }
        }
      }
    };
    if (window.location.hash) onHashChange();
    router.events.on("hashChangeStart", onHashChange);
    return () => {
      router.events.off("hashChangeStart", onHashChange);
    };
  }, [router.events]);

  const checkScrolled = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    if (scrollTop > 0) setShowToTop(true);
    else setShowToTop(false);
  };

  const toTop = () => {
    if (!wrapper.current) return;
    wrapper.current.scrollTop = 0;
  };

  return (
    <div
      className="overflow-auto grow p-12"
      onScroll={checkScrolled}
      ref={wrapper}
    >
      {babyBook.map((year, i) => {
        return (
          <div key={year.year} className="mb-10">
            <h1 className="text-3xl font-semibold mb-4">{year.year}</h1>
            {year.months.map((month, j) => {
              const monthSelected = month.images.every((_, k) =>
                selectedForDownload.has(selectedForDownloadKey(i, j, k))
              );

              return (
                <div key={month.month} ref={refs.current[i][j]}>
                  <h2
                    className="group flex items-center font-semibold mb-2 cursor-pointer"
                    onClick={() => {
                      selectedForDownload.batch((map) => {
                        month.images.forEach((img, k) => {
                          const key = selectedForDownloadKey(i, j, k);
                          if (monthSelected) {
                            map.delete(key);
                          } else {
                            map.set(key, img);
                          }
                        });
                      });
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={monthSelected}
                      className={`hidden mr-2 w-6 h-6 group-hover:block ${monthSelected ? "!block" : ""}`}
                    />
                    <span>
                      {monthIndexToString(month.month)} {year.year}
                    </span>
                  </h2>
                  <div className="flex flex-wrap">
                    {month.images.map((image, k) => {
                      const imageSelected = selectedForDownload.has(
                        selectedForDownloadKey(i, j, k)
                      );

                      return (
                        <BabyBookImage
                          image={image}
                          onClick={() => select(i, j, k)}
                          selected={imageSelected}
                          onCheckboxClick={() => {
                            if (imageSelected) {
                              selectedForDownload.delete(
                                selectedForDownloadKey(i, j, k)
                              );
                            } else {
                              selectedForDownload.set(
                                selectedForDownloadKey(i, j, k),
                                image
                              );
                            }
                          }}
                          key={k}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      {showToTop && (
        <button
          onClick={toTop}
          className="absolute bottom-12 right-12 w-[60px] h-[60px] rounded-full flex justify-center items-center bg-dark-100"
        >
          <ArrowUpIcon />
        </button>
      )}
    </div>
  );
};

const BabyBookImage = ({
  image,
  onClick,
  onCheckboxClick,
  selected,
}: {
  image: BabyImage;
  onClick: () => void;
  selected: boolean;
  onCheckboxClick: () => void;
}) => {
  const borderClasses = `border hover:border-mbb-pink ${selected ? "!border-mbb-pink" : ""}`;

  return (
    <div
      className={`group w-[200px] h-[300px] overflow-hidden relative shadow-lg rounded mx-3 my-3 cursor-pointer ${borderClasses}`}
      onClick={onClick}
    >
      <Image src={image.imageUrl} layout={"fill"} objectFit={"cover"} />
      {image.caption && (
        <p className="absolute bottom-0 left-0 right-0 line-clamp-3 text-ellipsis bg-white min-h-[4rem] p-3">
          {image.caption}
        </p>
      )}
      <input
        type="checkbox"
        checked={selected}
        className={`absolute hidden top-2 left-2 w-6 h-6 group-hover:block ${selected ? "!block" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          onCheckboxClick();
        }}
      />
    </div>
  );
};

interface Props {
  babyBook: BabyBookYear[];
  select: (arg0: number, arg1: number, arg2: number) => void;
  selectedForDownload: UseMapWrapper<string, BabyImage>;
}

export default PictureArray;
