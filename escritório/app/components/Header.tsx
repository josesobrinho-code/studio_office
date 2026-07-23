"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const navItems = [
  { label: "QUEM SOMOS", href: "/#quem-somos" },
  { label: "PRODUTOS", href: "/catalogo" },
  { label: "FALE CONOSCO", href: "/#formulario" },
  { label: "AVALIAÇÕES", href: "/#avaliacoes" },
  { label: "LOCALIZAÇÃO", href: "/#localizacao" },
];

export function Header() {
  const headerRef = useRef<HTMLElement | null>(null);
  const isVisible = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((current) => !current);
  };

  useEffect(() => {
    const header = headerRef.current;

    if (!header) {
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 760px)");

    if (mobileQuery.matches) {
      gsap.set(header, { y: 0, autoAlpha: 1 });
      isVisible.current = true;
    } else {
      gsap.set(header, { y: "-112%", autoAlpha: 0 });
    }

    const conceal = () => {
      if (!isVisible.current) {
        return;
      }

      isVisible.current = false;
      gsap.to(header, {
        y: "-112%",
        autoAlpha: 0,
        duration: 0.34,
        ease: "power3.inOut",
      });
    };

    const reveal = () => {
      if (isVisible.current) {
        return;
      }

      isVisible.current = true;
      gsap.to(header, {
        y: 0,
        autoAlpha: 1,
        duration: 0.45,
        ease: "power3.out",
      });
    };

    const syncWithPointer = (event: MouseEvent) => {
      if (mobileQuery.matches) return;

      if (event.clientY < 84) {
        reveal();
      } else if (event.clientY > 138) {
        conceal();
      }
    };

    window.addEventListener("mousemove", syncWithPointer, { passive: true });

    return () => {
      window.removeEventListener("mousemove", syncWithPointer);
    };
  }, []);

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape") closeMenu();
      }}
      ref={headerRef}
    >
      <Link className="site-header__brand" href="/" aria-label="Studio Office">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-studio-office.webp"
          alt="Studio Office"
          width="170"
          height="65"
        />
      </Link>

      <button
        aria-controls="site-header-navigation"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        className="site-header__menu-button"
        onClick={toggleMenu}
        type="button"
      >
        {menuOpen ? (
          <X aria-hidden="true" className="h-5 w-5" />
        ) : (
          <Menu aria-hidden="true" className="h-5 w-5" />
        )}
      </button>

      <nav
        aria-label="Navegação principal"
        className={`site-header__nav${menuOpen ? " is-open" : ""}`}
        id="site-header-navigation"
      >
        {navItems.map((item) => (
          <Link
            className="site-header__link"
            href={item.href}
            key={item.href}
            onClick={closeMenu}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
