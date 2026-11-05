import Image from "next/image";
import { PARTNER_HERO_VISUALS } from "./mockups";

/** Visuel d'ambiance ordinateur + téléphone (captures Banque Démo existantes). */
export function PartnerHeroDevices() {
  const desktop = PARTNER_HERO_VISUALS.desktop;
  const mobile = PARTNER_HERO_VISUALS.mobile;

  return (
    <figure className="partner-hero-devices">
      <div className="partner-hero-devices__stage" aria-hidden="true">
        <div className="partner-hero-devices__laptop">
          <div className="partner-hero-devices__laptop-screen">
            <Image
              src={desktop.src}
              alt=""
              width={desktop.width}
              height={desktop.height}
              className="partner-hero-devices__laptop-img"
              sizes="(max-width: 899px) 90vw, 520px"
              priority
            />
          </div>
          <div className="partner-hero-devices__laptop-base" />
        </div>

        <div className="partner-hero-devices__phone">
          <div className="partner-hero-devices__phone-screen">
            <Image
              src={mobile.src}
              alt=""
              width={mobile.width}
              height={mobile.height}
              className="partner-hero-devices__phone-img"
              sizes="(max-width: 899px) 140px, 160px"
              priority
            />
          </div>
        </div>
      </div>
      <figcaption className="partner-hero-devices__caption">
        Des formats qui s&apos;intègrent au parcours de lecture
      </figcaption>
    </figure>
  );
}
