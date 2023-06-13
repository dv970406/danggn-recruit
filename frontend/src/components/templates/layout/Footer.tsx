import React from "react";
import { FOOTER_NAVS_LIST } from "@/src/utils/values/NavsList";
import FooterNavItem from "../../organisms/layout/FooterNavItem";

// Footer로 당근마켓 정보, 저작권 정보를 표시함
const Footer = () => {
  return (
    <footer className="inset-x-0 py-20">
      <div className="justify-between gap-16 px-4 mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg column-box lg:flex-row">
        <div className="lg:w-[70%] gap-6 column-box w-full">
          <p className="leading-7 text-danggn-darkgray text-sub">
            주소 : 서울특별시 서초구 강남대로 465, 교보강남타워 11층
            <br />
            (IR 관련 문의 : ir@daangn.com)
            <br />
            (채용 관련 문의 : recruit@daangn.com)
          </p>

          <h4 className="text-subaccent text-danggn-darkgray">
            © 당근마켓(made by{" "}
            <a
              href="https://github.com/dv970406"
              target="_blank"
              className="text-accent"
            >
              최성준
            </a>
            )
          </h4>

          <div>
            <p className=" text-sub text-danggn-darkgray">
              ⓒ 2023.
              <a
                href="https://notefolio.net/army_art/313140"
                target="_blank"
                className="text-accent"
              >
                손아름
              </a>{" "}
              all rights reserved. - HomePage 배너 영상
            </p>
            <p className=" text-sub text-danggn-darkgray">
              ⓒ 2023.
              <a
                href="https://notefolio.net/min__e/306859"
                target="_blank"
                className="text-accent"
              >
                min
              </a>{" "}
              all rights reserved. - HomePage 배너 3D 이미지
            </p>
          </div>
        </div>

        <nav className="lg:w-[30%] w-full">
          <ul className="gap-6 lg:justify-end row-box">
            {FOOTER_NAVS_LIST.map(({ ...nav }) => (
              <FooterNavItem key={nav.id} {...nav} />
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
