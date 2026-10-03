"use client";

import React from "react";

interface ChemicalSkeletalSvgProps {
  type: string;
  className?: string;
}

export const ChemicalSkeletalSvg: React.FC<ChemicalSkeletalSvgProps> = ({
  type,
  className = "w-full h-auto",
}) => {
  switch (type) {
    case "retinol":
      return (
        <svg viewBox="0 0 340 170" fill="none" className={className}>
          <line x1="204.6" y1="24.5" x2="200.5" y2="26.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="141.3" y1="129.5" x2="141.3" y2="143.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="141.3" y1="129.5" x2="153.1" y2="122.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="141.3" y1="129.5" x2="127.6" y2="129.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="141.3" y1="129.5" x2="134.4" y2="117.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="141.3" y1="143.2" x2="153.1" y2="150" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="153.1" y1="150" x2="165" y2="143.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="152" y1="124.5" x2="163.9" y2="131.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="154.2" y1="120.7" x2="166.1" y2="127.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="153.1" y1="122.6" x2="153.1" y2="108.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="165" y1="143.2" x2="165" y2="129.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="165" y1="129.5" x2="176.8" y2="122.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="154.2" y1="110.8" x2="166.1" y2="104" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="152" y1="107" x2="163.9" y2="100.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="165" y1="102.1" x2="165" y2="88.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="165" y1="88.4" x2="153.1" y2="81.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="166.1" y1="90.3" x2="177.9" y2="83.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="163.9" y1="86.5" x2="175.7" y2="79.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="176.8" y1="81.6" x2="176.8" y2="67.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="177.9" y1="69.8" x2="189.8" y2="63" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="175.7" y1="66" x2="187.6" y2="59.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="188.7" y1="61.1" x2="188.7" y2="47.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="188.7" y1="47.4" x2="176.8" y2="40.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="189.8" y1="49.3" x2="201.6" y2="42.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="187.6" y1="45.5" x2="199.4" y2="38.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="200.5" y1="40.5" x2="200.5" y2="26.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <text x="212.4" y="20" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">OH</text>
        </svg>
      );

    case "calciferol":
      return (
        <svg viewBox="0 0 340 170" fill="none" className={className}>
          <line x1="128.7" y1="143.7" x2="125.6" y2="145.5" stroke="currentColor" strokeWidth="2.2" strokeDasharray="2.5,2.5" strokeLinecap="round" />
          <line x1="161.5" y1="74.4" x2="173.4" y2="70.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="161.5" y1="74.4" x2="161.5" y2="87" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="161.5" y1="74.4" x2="150.6" y2="68.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <polygon points="161.5,74.4 165,61.8 158,61.8" fill="currentColor" />
          <line x1="173.4" y1="70.5" x2="180.8" y2="80.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="173.4" y1="70.5" x2="177.3" y2="58.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="161.5" y1="87" x2="173.4" y2="90.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="161.5" y1="87" x2="150.6" y2="93.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="180.8" y1="80.7" x2="173.4" y2="90.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="150.6" y1="68.1" x2="139.7" y2="74.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="177.3" y1="58.5" x2="189.7" y2="55.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="177.3" y1="58.5" x2="168.9" y2="49.2" stroke="currentColor" strokeWidth="2.2" strokeDasharray="2.5,2.5" strokeLinecap="round" />
          <line x1="150.6" y1="93.3" x2="139.7" y2="87" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="148.4" y1="93.3" x2="148.4" y2="105.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="152.8" y1="93.3" x2="152.8" y2="105.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="139.7" y1="74.4" x2="139.7" y2="87" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="189.7" y1="55.9" x2="193.6" y2="44" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="150.6" y1="105.9" x2="139.7" y2="112.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="193.6" y1="44" x2="205.9" y2="41.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="205.9" y1="41.4" x2="209.8" y2="29.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="137.5" y1="112.2" x2="137.5" y2="124.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="141.9" y1="112.2" x2="141.9" y2="124.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="209.8" y1="29.4" x2="222.2" y2="26.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="209.8" y1="29.4" x2="201.4" y2="20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="139.7" y1="124.8" x2="128.7" y2="131.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="139.7" y1="124.8" x2="150.6" y2="131.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="128.7" y1="131.1" x2="128.7" y2="143.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="150.6" y1="131.1" x2="150.6" y2="143.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="151.7" y1="133" x2="162.6" y2="126.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="149.5" y1="129.2" x2="160.4" y2="122.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="128.7" y1="143.7" x2="139.7" y2="150" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="150.6" y1="143.7" x2="139.7" y2="150" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <text x="117.8" y="150" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">HO</text>
        </svg>
      );

    case "tocopherol":
      return (
        <svg viewBox="0 0 340 170" fill="none" className={className}>
          <line x1="113.4" y1="128.9" x2="121.3" y2="124.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="97.9" y1="128.6" x2="90.2" y2="124" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="53" y1="102.6" x2="60.2" y2="106.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="121.3" y1="124.4" x2="138.6" y2="124.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="121.3" y1="124.4" x2="121.3" y2="106.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="121.3" y1="124.4" x2="129.9" y2="139.4" stroke="currentColor" strokeWidth="2.2" strokeDasharray="2.5,2.5" strokeLinecap="round" />
          <line x1="138.6" y1="124.5" x2="147.4" y2="109.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="121.3" y1="106.4" x2="105.6" y2="97.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="147.4" y1="109.5" x2="164.7" y2="109.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="173.4" y1="94.6" x2="164.7" y2="109.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="173.4" y1="94.6" x2="190.7" y2="94.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="173.4" y1="94.6" x2="164.8" y2="79.6" stroke="currentColor" strokeWidth="2.2" strokeDasharray="2.5,2.5" strokeLinecap="round" />
          <line x1="105.6" y1="97.5" x2="90.2" y2="106.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="190.7" y1="94.7" x2="199.4" y2="79.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="88" y1="106.7" x2="88" y2="124" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="92.4" y1="106.7" x2="92.4" y2="124" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="90.2" y1="106.7" x2="75.2" y2="98.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="199.4" y1="79.7" x2="216.7" y2="79.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="90.2" y1="124" x2="75.2" y2="132.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="216.7" y1="79.8" x2="225.4" y2="64.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="225.4" y1="64.8" x2="242.8" y2="64.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="225.4" y1="64.8" x2="216.8" y2="49.8" stroke="currentColor" strokeWidth="2.2" strokeDasharray="2.5,2.5" strokeLinecap="round" />
          <line x1="242.8" y1="64.9" x2="251.5" y2="49.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="74.1" y1="96.2" x2="59.1" y2="104.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="76.3" y1="100" x2="61.3" y2="108.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="75.2" y1="98.1" x2="75.2" y2="80.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="76.3" y1="130.8" x2="61.3" y2="122.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="74.1" y1="134.6" x2="59.1" y2="125.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="75.2" y1="132.7" x2="75.2" y2="150" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="251.5" y1="49.9" x2="268.8" y2="50" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="60.2" y1="124" x2="60.2" y2="106.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="60.2" y1="124" x2="45.2" y2="132.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="268.8" y1="50" x2="277.5" y2="35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="277.5" y1="35" x2="294.8" y2="35.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="277.5" y1="35" x2="268.9" y2="20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <text x="105.6" y="133.3" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">O</text>
          <text x="45.2" y="98.1" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">HO</text>
        </svg>
      );

    case "phylloquinone":
      return (
        <svg viewBox="0 0 340 170" fill="none" className={className}>
          <line x1="276.2" y1="110.5" x2="276.2" y2="102.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="271.8" y1="110.5" x2="271.8" y2="102.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="271.8" y1="59.5" x2="271.8" y2="67.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="276.2" y1="59.5" x2="276.2" y2="67.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="94.7" y1="102.3" x2="109.6" y2="93.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="94.7" y1="102.3" x2="79.8" y2="93.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="94.7" y1="102.3" x2="94.7" y2="119.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="109.6" y1="93.6" x2="124.6" y2="102.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="154.5" y1="102.3" x2="139.5" y2="93.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="154.5" y1="102.3" x2="169.4" y2="93.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="154.5" y1="102.3" x2="154.5" y2="119.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="124.6" y1="102.3" x2="139.5" y2="93.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="79.8" y1="93.6" x2="64.8" y2="102.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="169.4" y1="93.6" x2="184.4" y2="102.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="64.8" y1="102.3" x2="49.9" y2="93.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="49.9" y1="93.6" x2="34.9" y2="102.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="184.4" y1="102.3" x2="199.3" y2="93.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="34.9" y1="102.3" x2="20" y2="93.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="34.9" y1="102.3" x2="34.9" y2="119.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="199.3" y1="93.6" x2="214.2" y2="102.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="215.3" y1="104.2" x2="230.3" y2="95.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="213.1" y1="100.4" x2="228.1" y2="91.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="214.2" y1="102.3" x2="214.2" y2="119.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="229.2" y1="93.6" x2="244.1" y2="102.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="244.1" y1="102.3" x2="259.1" y2="93.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="261.3" y1="93.6" x2="261.3" y2="76.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="256.9" y1="93.6" x2="256.9" y2="76.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="259.1" y1="93.6" x2="274" y2="102.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="259.1" y1="76.4" x2="274" y2="67.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="259.1" y1="76.4" x2="244.1" y2="67.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="274" y1="102.3" x2="288.9" y2="93.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="288.9" y1="93.6" x2="288.9" y2="76.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="287.8" y1="95.5" x2="303.3" y2="104.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="290" y1="91.7" x2="305.5" y2="101" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="288.9" y1="76.4" x2="274" y2="67.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="290" y1="78.3" x2="305.5" y2="69" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="287.8" y1="74.5" x2="303.3" y2="65.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="304.4" y1="102.9" x2="320" y2="94" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="304.4" y1="67.1" x2="320" y2="76" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="322.2" y1="94" x2="322.2" y2="76" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="317.8" y1="94" x2="317.8" y2="76" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <text x="274" y="119.5" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">O</text>
          <text x="274" y="50.5" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">O</text>
        </svg>
      );

    case "thiamine":
      return (
        <svg viewBox="0 0 340 170" fill="none" className={className}>
          <line x1="145.4" y1="66.5" x2="154.8" y2="66.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="133.6" y1="75.1" x2="130.7" y2="84" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="163.6" y1="27.3" x2="158.1" y2="34.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="152.9" y1="89.5" x2="160.5" y2="84" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="145.6" y1="103.8" x2="145.6" y2="113.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="139.6" y1="87.7" x2="132" y2="82.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="137" y1="91.3" x2="129.4" y2="85.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="170.7" y1="143.6" x2="162.6" y2="138.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="168.5" y1="147.4" x2="160.4" y2="142.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="185.2" y1="145.5" x2="193.4" y2="140.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="185.6" y1="117.9" x2="177.4" y2="113.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="191.2" y1="131.4" x2="191.2" y2="140.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="195.6" y1="131.4" x2="195.6" y2="140.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="157.7" y1="143" x2="161.5" y2="140.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="162.6" y1="83.3" x2="156.9" y2="65.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="158.4" y1="84.7" x2="152.7" y2="67.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="160.5" y1="84" x2="178" y2="89.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="145.6" y1="113.2" x2="161.5" y2="122.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="154.8" y1="66.5" x2="165.6" y2="51.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="165.6" y1="51.7" x2="158.1" y2="34.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="161.5" y1="122.4" x2="161.5" y2="140.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="162.6" y1="124.3" x2="178.5" y2="115.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="160.4" y1="120.5" x2="176.3" y2="111.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="193.4" y1="140.8" x2="209.3" y2="150" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <text x="136.4" y="66.5" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">S</text>
          <text x="168.9" y="20" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">OH</text>
          <text x="145.6" y="94.8" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">N</text>
          <text x="177.4" y="150" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">N</text>
          <text x="193.4" y="122.4" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">N</text>
          <text x="145.6" y="150" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">NH₂</text>
        </svg>
      );

    case "riboflavin":
      return (
        <svg viewBox="0 0 340 170" fill="none" className={className}>
          <line x1="155.1" y1="71.8" x2="147.9" y2="75.9" stroke="currentColor" strokeWidth="2.2" strokeDasharray="2.5,2.5" strokeLinecap="round" />
          <polygon points="155.1,54.5 163.9,53.4 160.5,47.4" fill="currentColor" />
          <line x1="140.1" y1="45.9" x2="133" y2="50" stroke="currentColor" strokeWidth="2.2" strokeDasharray="2.5,2.5" strokeLinecap="round" />
          <line x1="133" y1="24.5" x2="140.1" y2="28.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="202.5" y1="141" x2="202.6" y2="132.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="198.1" y1="141" x2="198.2" y2="132.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="222" y1="99.8" x2="214.9" y2="104" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="224.2" y1="103.6" x2="217.1" y2="107.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="170" y1="88.6" x2="170" y2="80.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="162.2" y1="102.1" x2="155.1" y2="106.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="177.8" y1="102.1" x2="184.9" y2="106.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="162.2" y1="127.6" x2="155.1" y2="123.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="178.9" y1="129.5" x2="186" y2="125.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="176.7" y1="125.7" x2="183.8" y2="121.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="191.6" y1="99.7" x2="183.8" y2="104.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="193.8" y1="103.5" x2="186" y2="108.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="208.2" y1="101.5" x2="216" y2="105.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="208.2" y1="128.3" x2="200.4" y2="132.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="216" y1="114.9" x2="216" y2="105.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="155.1" y1="71.8" x2="170" y2="80.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="155.1" y1="71.8" x2="155.1" y2="54.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="155.1" y1="54.5" x2="140.1" y2="45.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="140.1" y1="45.9" x2="140.1" y2="28.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="152.9" y1="106.3" x2="152.9" y2="123.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="157.3" y1="106.3" x2="157.3" y2="123.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="155.1" y1="106.3" x2="139.6" y2="97" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="184.9" y1="106.3" x2="184.9" y2="123.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="155.1" y1="123.5" x2="139.6" y2="132.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="138.5" y1="95.1" x2="122.9" y2="104" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="140.7" y1="98.9" x2="125.1" y2="107.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="184.9" y1="123.5" x2="200.4" y2="132.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="124" y1="105.9" x2="124" y2="123.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="124" y1="105.9" x2="109.1" y2="97.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="140.7" y1="130.8" x2="125.1" y2="122" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="138.5" y1="134.6" x2="122.9" y2="125.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="124" y1="123.9" x2="109.1" y2="132.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <text x="140.1" y="80.4" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">HO</text>
          <text x="170" y="45.9" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">OH</text>
          <text x="125.2" y="54.5" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">HO</text>
          <text x="125.2" y="20" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">HO</text>
          <text x="200.2" y="150" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">O</text>
          <text x="230.9" y="97.2" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">O</text>
          <text x="170" y="97.6" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">N</text>
          <text x="170" y="132.1" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">N</text>
          <text x="200.4" y="97" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">N</text>
          <text x="216" y="123.9" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">NH</text>
        </svg>
      );

    case "pyridoxine":
      return (
        <svg viewBox="0 0 340 170" fill="none" className={className}>
          <line x1="97.4" y1="80.2" x2="121.8" y2="94.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="178.3" y1="24.5" x2="153.9" y2="38.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="242.6" y1="89.8" x2="218.2" y2="75.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="147.2" y1="143.6" x2="122.9" y2="129.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="145" y1="147.4" x2="120.7" y2="133.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="161.7" y1="145.5" x2="186.1" y2="131.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="153.9" y1="75.7" x2="186.1" y2="94.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="152.8" y1="73.8" x2="120.7" y2="92.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="155" y1="77.6" x2="122.9" y2="96.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="153.9" y1="75.7" x2="153.9" y2="38.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="186.1" y1="94.3" x2="218.2" y2="75.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="183.9" y1="94.3" x2="183.9" y2="131.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="188.3" y1="94.3" x2="188.3" y2="131.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="121.8" y1="94.3" x2="121.8" y2="131.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="121.8" y1="131.4" x2="89.6" y2="150" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <text x="89.6" y="75.7" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">HO</text>
          <text x="186.1" y="20" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">OH</text>
          <text x="250.4" y="94.3" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">OH</text>
          <text x="153.9" y="150" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">N</text>
        </svg>
      );

    case "cobalamin":
      return (
        <svg viewBox="0 0 340 170" fill="none" className={className}>
          <line x1="193.3" y1="75.1" x2="197.2" y2="65.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="199.9" y1="58.3" x2="196.1" y2="68.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="205" y1="69.9" x2="195.2" y2="66.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="189.1" y1="61.3" x2="198.8" y2="65.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="187.5" y1="65.3" x2="197.2" y2="69.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="141.9" y1="134.2" x2="143.2" y2="133.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="144.1" y1="138" x2="145.4" y2="137.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="166.2" y1="110.3" x2="166.6" y2="108.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="170.4" y1="111.3" x2="170.8" y2="109.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="174.5" y1="87.1" x2="175.4" y2="88.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="171.1" y1="89.9" x2="172" y2="91.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="114.7" y1="135.8" x2="115.5" y2="137.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="102.1" y1="110.7" x2="102.9" y2="112" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="98.3" y1="112.9" x2="99.1" y2="114.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="94.7" y1="92.4" x2="93.3" y2="93" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="141.4" y1="62.1" x2="143" y2="62.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <polygon points="186.5,74.7 185.5,78.4 184.5,71.4" fill="currentColor" />
          <line x1="206.8" y1="58.6" x2="208.3" y2="58.4" stroke="currentColor" strokeWidth="2.2" strokeDasharray="2.5,2.5" strokeLinecap="round" />
          <line x1="208.7" y1="51.8" x2="210.2" y2="52" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="218.9" y1="62.1" x2="218.7" y2="60.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="212" y1="63.9" x2="212.2" y2="62.4" stroke="currentColor" strokeWidth="2.2" strokeDasharray="2.5,2.5" strokeLinecap="round" />
          <line x1="206" y1="46.6" x2="206.9" y2="45.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="141.3" y1="118.1" x2="139.9" y2="117.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="125.6" y1="116.6" x2="126.9" y2="115.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="128.4" y1="120" x2="129.7" y2="119" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="150.7" y1="109.7" x2="149.4" y2="108.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="152" y1="96.8" x2="150.9" y2="98.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="148.4" y1="94.2" x2="147.3" y2="95.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="117.9" y1="110.1" x2="119.1" y2="108.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="117.9" y1="95.5" x2="119.1" y2="97.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="140.9" y1="87.2" x2="139.9" y2="88" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="128.2" y1="85.6" x2="129.4" y2="86.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="125.4" y1="89" x2="126.6" y2="89.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="144.3" y1="128.8" x2="144.3" y2="135.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="164" y1="104.8" x2="168.7" y2="109.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="173.1" y1="91.2" x2="173.7" y2="89.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="185.3" y1="81.5" x2="183.8" y2="81.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="117.1" y1="139.3" x2="115.5" y2="139.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="117.1" y1="134.9" x2="115.5" y2="134.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="107.5" y1="112.9" x2="101" y2="113.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="90.9" y1="94.2" x2="91.1" y2="92.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="95.3" y1="94.8" x2="95.5" y2="93.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="141.6" y1="64.4" x2="141" y2="63.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="145.6" y1="62.6" x2="145" y2="61.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="218.7" y1="60.6" x2="217.3" y2="59.9" stroke="currentColor" strokeWidth="2.2" strokeDasharray="2.5,2.5" strokeLinecap="round" />
          <line x1="233.3" y1="60" x2="231.9" y2="60.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="224.4" y1="73.2" x2="224.2" y2="71.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="228.8" y1="72.6" x2="228.6" y2="71.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="224.8" y1="71.1" x2="226.4" y2="71.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="237.9" y1="64.6" x2="237.2" y2="66" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="177.5" y1="20" x2="176" y2="20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="177.5" y1="23" x2="176" y2="23" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="177.5" y1="17" x2="176" y2="17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="139.9" y1="117.1" x2="137.7" y2="124.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="139.9" y1="117.1" x2="149.4" y2="108.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="139.9" y1="117.1" x2="146.3" y2="121" stroke="currentColor" strokeWidth="2.2" strokeDasharray="2.5,2.5" strokeLinecap="round" />
          <line x1="137.7" y1="124.1" x2="130.5" y2="124.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="137.7" y1="124.1" x2="137.8" y2="131.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="137.7" y1="124.1" x2="144.9" y2="126.4" stroke="currentColor" strokeWidth="2.2" strokeDasharray="2.5,2.5" strokeLinecap="round" />
          <line x1="149.4" y1="108.1" x2="156.2" y2="106.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="156.2" y1="106.2" x2="156.2" y2="98.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <polygon points="156.2,106.2 159.2,113.9 164,108.9" fill="currentColor" />
          <line x1="130.5" y1="124.1" x2="128.3" y2="117.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="130.5" y1="124.1" x2="126.7" y2="130.6" stroke="currentColor" strokeWidth="2.2" strokeDasharray="2.5,2.5" strokeLinecap="round" />
          <line x1="156.2" y1="98.9" x2="149.1" y2="97" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="156.2" y1="98.9" x2="163.6" y2="97.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <polygon points="156.2,98.9 160.9,92.1 153.9,90.9" fill="currentColor" />
          <line x1="128.3" y1="117.3" x2="121.2" y2="115.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="137.8" y1="131.6" x2="144.3" y2="135.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="149.1" y1="97" x2="147" y2="90.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="126.7" y1="130.6" x2="119.3" y2="130.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="161.6" y1="111.4" x2="168.7" y2="109.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="163.6" y1="97.8" x2="166.3" y2="90.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="123.3" y1="114.6" x2="121.2" y2="107.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="119.1" y1="115.8" x2="117" y2="109" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="121.2" y1="115.2" x2="116.2" y2="120.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="147.7" y1="88.1" x2="140.6" y2="85.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="146.3" y1="92.3" x2="139.2" y2="90.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="147" y1="90.2" x2="152.5" y2="85.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="112" y1="106.4" x2="119.1" y2="108.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="112" y1="106.4" x2="112" y2="99.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="112" y1="106.4" x2="104.6" y2="106.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="112" y1="106.4" x2="109.9" y2="113.6" stroke="currentColor" strokeWidth="2.2" strokeDasharray="2.5,2.5" strokeLinecap="round" />
          <line x1="119.3" y1="130.6" x2="115.5" y2="137.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="166.3" y1="90.8" x2="173.7" y2="89.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="112" y1="99.1" x2="119.1" y2="97.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="112" y1="99.1" x2="106.1" y2="94.6" stroke="currentColor" strokeWidth="2.2" strokeDasharray="2.5,2.5" strokeLinecap="round" />
          <line x1="139.9" y1="88" x2="137.5" y2="81.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="137.5" y1="81.2" x2="130.2" y2="81.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="137.5" y1="81.2" x2="141.8" y2="75.1" stroke="currentColor" strokeWidth="2.2" strokeDasharray="2.5,2.5" strokeLinecap="round" />
          <line x1="130.2" y1="81.2" x2="128" y2="88.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="130.2" y1="81.2" x2="130.2" y2="73.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="130.2" y1="81.2" x2="123.1" y2="78.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="121.2" y1="97.8" x2="123.1" y2="90.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="117" y1="96.6" x2="118.9" y2="89.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="128" y1="88.2" x2="121" y2="90.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="104.6" y1="106.6" x2="101" y2="113.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="106.1" y1="94.6" x2="99.2" y2="97.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="141.8" y1="75.1" x2="138.7" y2="68.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="99.2" y1="97.5" x2="93.3" y2="93" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="138.7" y1="68.3" x2="143" y2="62.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="183.8" y1="81.7" x2="186.5" y2="74.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="186.5" y1="74.7" x2="181.9" y2="68.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="206.8" y1="58.6" x2="212" y2="63.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="206.8" y1="58.6" x2="210.2" y2="52" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="212" y1="63.9" x2="218.7" y2="60.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <polygon points="210.2,52 210,43.8 203.8,46.8" fill="currentColor" />
          <line x1="230.3" y1="62.3" x2="235.6" y2="67.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="233.5" y1="59.1" x2="238.8" y2="64.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="231.9" y1="60.7" x2="233.9" y2="53.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="237.2" y1="66" x2="244.4" y2="64.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="234.4" y1="55.6" x2="241.7" y2="53.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="233.4" y1="51.4" x2="240.7" y2="49.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="246.5" y1="64.8" x2="248.5" y2="57.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="242.3" y1="63.6" x2="244.3" y2="56.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="241.2" y1="51.7" x2="246.4" y2="57" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="241.2" y1="51.7" x2="243.2" y2="44.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="246.4" y1="57" x2="253.6" y2="55.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <text x="115.5" y="150" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">Co</text>
          <text x="196.6" y="66.7" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">P</text>
          <text x="150.7" y="131.5" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">O</text>
          <text x="170.5" y="102.1" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">O</text>
          <text x="178.3" y="95.6" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">O</text>
          <text x="119.3" y="143.5" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">O</text>
          <text x="104.8" y="119.5" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">O</text>
          <text x="86.4" y="95.9" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">O</text>
          <text x="150.4" y="62.9" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">O</text>
          <text x="193.9" y="73.6" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">O</text>
          <text x="199.4" y="59.7" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">O</text>
          <text x="203.6" y="69.4" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">OH</text>
          <text x="189.7" y="63.9" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">O</text>
          <text x="217.6" y="53.2" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">O</text>
          <text x="210.8" y="71.3" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">HO</text>
          <text x="211" y="39.1" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">OH</text>
          <text x="134.1" y="112.7" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">N</text>
          <text x="145" y="102.8" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">N</text>
          <text x="123.2" y="102.8" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">NH</text>
          <text x="133.9" y="92.8" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">N</text>
          <text x="144.3" y="142.8" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">NH₂</text>
          <text x="174.1" y="114.5" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">NH₂</text>
          <text x="176.4" y="82.8" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">NH</text>
          <text x="108.1" y="137.1" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">NH</text>
          <text x="93.5" y="113.3" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">NH₂</text>
          <text x="94.2" y="85.6" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">NH</text>
          <text x="139.8" y="55.4" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">NH</text>
          <text x="225.3" y="64" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">N</text>
          <text x="233.7" y="72.6" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">NH</text>
          <text x="168.5" y="20" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">N</text>
        </svg>
      );

    case "ascorbic_acid":
      return (
        <svg viewBox="0 0 340 170" fill="none" className={className}>
          <line x1="193.4" y1="97.5" x2="179" y2="87" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="197.9" y1="111.4" x2="192.4" y2="128.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <polygon points="179,60.2 165.4,48.3 161.8,54.3" fill="currentColor" />
          <line x1="140.4" y1="97.3" x2="157.3" y2="102.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="202.2" y1="29" x2="202.2" y2="46.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="155.1" y1="142.7" x2="165.6" y2="128.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="204.7" y1="141.4" x2="194.2" y2="127" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="201.1" y1="144" x2="190.6" y2="129.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="179" y1="87" x2="179" y2="60.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="179" y1="87" x2="157.3" y2="102.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="179" y1="60.2" x2="202.2" y2="46.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="155.2" y1="103.5" x2="163.5" y2="129" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="159.4" y1="102.1" x2="167.7" y2="127.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="165.6" y1="128.3" x2="192.4" y2="128.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <text x="200.7" y="102.8" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">O</text>
          <text x="155.8" y="46.8" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">HO</text>
          <text x="131.8" y="94.5" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">HO</text>
          <text x="202.2" y="20" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">OH</text>
          <text x="149.8" y="150" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">HO</text>
          <text x="208.2" y="150" fill="currentColor" fontSize="12" fontFamily="var(--font-mono)" fontWeight="600" textAnchor="middle" dominantBaseline="central">O</text>
        </svg>
      );

    default:
      return null;
  }
};
