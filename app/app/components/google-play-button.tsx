import Image from 'next/image';

export default function GooglePlayButton() {
  return (
    <button className="flex items-center rounded-lg bg-dimmed-70 px-4 py-2 font-medium text-white transition duration-300 hover:bg-green-600">
      <Image
        src="/assets/new-landing/googleplay.png"
        alt="Google Play"
        width={20}
        height={20}
        className="mr-2"
      />
      Google Play
    </button>
  );
}
