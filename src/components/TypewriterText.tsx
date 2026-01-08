import { TypeAnimation } from "react-type-animation";
import { FC } from "react";


// Define the props interface
interface TypewriterTextProps {
  speed: number;
}

const TypewriterText: FC<TypewriterTextProps> = ({ speed }) =>{
  return (
    <TypeAnimation
        sequence={[
          "Premium Confectionery?", 2000,
          "Afghan Dried Fruits & Nuts?", 2000,
          "Shafa Pomegranate Beverages?", 2000,
          "Laziz Fruit Fudges?", 2000,
          "International Instant Noodles?", 2000,
          "Ginseng Energy Drinks?", 2000,
          "Middle Eastern Pantry Staples?", 2000,
          "Bulk Malt Beverages?", 2000,
          "Artisan Dates & Sweets?", 2000,
          "Exclusive Brand Distribution?", 2000,
        ]}
      wrapper="span"
      repeat={Infinity}
      cursor={true}
      className="text-3xl md:text-4xl font-extrabold text-[#8B4513]"
    />
  );
};

export default TypewriterText;
