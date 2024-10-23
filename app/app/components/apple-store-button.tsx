import Image from 'next/image';

export default function AppleStoreButton() {
  return (
    <button className="flex items-center gap-2 rounded-lg bg-dimmed-70 px-4 py-2 font-medium text-white transition duration-300 hover:bg-gray-800">
      <Image src="/assets/new-landing/applekorea.png" alt="App Store" width={20} height={20} />
      App Store
    </button>
  );
}
