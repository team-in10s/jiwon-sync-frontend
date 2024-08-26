import { useState } from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';

const slideContents = [
  {
    title: '동기화 완료 되었나요?',
    description: 'OneID로 더 쉽게 관리하세요.',
    image: 'extention-usage1.png',
  },
  {
    title: '간단한 3step',
    description: '크롬 익스텐션을 추가 하고,',
    image: 'extention-usage2.png',
  },
  {
    title: '간단한 3step',
    description: '지원전에 로그인을 진행해주세요.',
    image: 'extention-usage3.png',
  },
  {
    title: '간단한 3step',
    description:
      '연결된 채용 사이트는 로그인 버튼만 클릭하면\n' + '아이디-비번 없이 자동으로 로그인됩니다!',
    image: 'extention-usage4.png',
  },
];

export default function SliderContent() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return (
    <>
      <div className="relative">
        <div ref={sliderRef} className="keen-slider">
          {slideContents.map((content) => {
            return (
              <div key={content.image} className="keen-slider__slide h-64 pt-2">
                <div className="text-center text-xl font-semibold">{content.title}</div>
                <div className="mb-4 text-center">{content.description}</div>
                <Image
                  className="mx-auto"
                  src={`/assets/extension_guide/${content.image}`}
                  alt={content.title}
                  width={270}
                  height={100}
                />
              </div>
            );
          })}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              // eslint-disable-next-line  @typescript-eslint/no-explicit-any
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
              disabled={currentSlide === 0}
            />

            <Arrow
              // eslint-disable-next-line  @typescript-eslint/no-explicit-any
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
              disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
            />
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className="flex justify-center py-3">
          {[0, 1, 2, 3].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={`mx-1 size-2 rounded-full p-1 ${currentSlide === idx ? 'bg-primary/70' : 'bg-gray-500'}`}
              ></button>
            );
          })}
        </div>
      )}
    </>
  );
}

function Arrow({
  disabled,
  onClick,
  left,
}: {
  disabled: boolean;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  onClick: (e: any) => void;
  left?: boolean;
}) {
  return (
    <svg
      onClick={onClick}
      className={`absolute top-1/2 size-7 -translate-y-1/2 cursor-pointer fill-white ${left ? 'left-1' : 'right-1'} ${disabled ? 'fill-gray-600/50' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {left && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
      {!left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  );
}
