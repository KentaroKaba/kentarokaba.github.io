"use strict";

(() => {
const sitePages = [
    {
        id: "home",
        label: { en: "Home", ja: "ホーム" },
        href: { en: "/", ja: "/ja/" }
    },
    {
        id: "publications",
        label: { en: "Publications", ja: "論文" },
        href: { en: "/publications", ja: "/ja/publications" }
    },
    {
        id: "presentations",
        label: { en: "Presentations", ja: "学会発表" },
        href: { en: "/presentations", ja: "/ja/presentations" }
    },
    {
        id: "cv",
        label: { en: "CV", ja: "CV" },
        href: { en: "/cv", ja: "/ja/cv" }
    },
    {
        id: "others",
        label: { en: "Others", ja: "その他" },
        href: { en: "/others", ja: "/ja/others" }
    }
];

class SiteHeader extends HTMLElement {
    connectedCallback() {
        if (this.dataset.rendered === "true") {
            return;
        }

        const language = this.getAttribute("lang") === "ja" ? "ja" : "en";
        const alternateLanguage = language === "en" ? "ja" : "en";
        const currentPage = this.getAttribute("current-page") || "home";
        const currentPageData = sitePages.find((page) => page.id === currentPage) || sitePages[0];

        const languageSwitcher = language === "en"
            ? `<span aria-current="true">English</span><span aria-hidden="true">/</span><a href="${currentPageData.href.ja}" hreflang="ja" lang="ja">日本語</a>`
            : `<a href="${currentPageData.href.en}" hreflang="en" lang="en">English</a><span aria-hidden="true">/</span><span aria-current="true">日本語</span>`;

        const navigation = sitePages.map((page) => {
            const label = page.label[language];
            if (page.id === currentPage) {
                return `<li><span aria-current="page">${label}</span></li>`;
            }
            return `<li><a href="${page.href[language]}">${label}</a></li>`;
        }).join("");

        const navigationLabel = language === "ja" ? "メインナビゲーション" : "Main navigation";
        const languageLabel = language === "ja" ? "言語選択" : "Language selection";

        this.innerHTML = `
            <header class="site-header">
                <div lang="en">
                    <h1>Kentaro Kaba</h1>
                    <p>Ph.D. student, Institute of Science Tokyo</p>
                </div>
                <div class="language-switcher" aria-label="${languageLabel}">
                    ${languageSwitcher}
                </div>
                <nav aria-label="${navigationLabel}">
                    <ul>${navigation}</ul>
                </nav>
            </header>
        `;

        this.dataset.rendered = "true";
        this.setAttribute("lang", language);
        this.setAttribute("data-alternate-language", alternateLanguage);
    }
}

if (!customElements.get("site-header")) {
    customElements.define("site-header", SiteHeader);
}
})();
