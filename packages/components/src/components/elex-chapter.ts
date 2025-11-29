import { LitElement, html, unsafeCSS, CSSResult, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { loadChapter } from "../chapter-provider";
import { ChapterSlug, Chapter, missingChapter } from "@elex/content";

@customElement("elex-chapter")
export class ElexChapter extends LitElement {
  @property() slug?: ChapterSlug;
  @state() private chapter: Chapter = missingChapter;

  async updated(changedProps: Map<string, any>) {
    if (changedProps.has("slug")) {
      await this.loadChapter();
    }
  }

  async loadChapter() {
    if (!this.slug) {
      console.error("Error loading chapter:", new Error('No slug found.'));
      this.chapter = missingChapter;
      return;
    }
    this.chapter = await loadChapter(this.slug);
  }

  render() {
    const { index, articlesCount, links, title, titleEndsWithPeriod } = this.chapter.meta;

    return html`
        <style>
            ${ unsafeCSS(this.chapter.css) }
        </style>
        <article>
            <h1>${ title }</h1>
            ${ unsafeHTML(this.chapter.html) }
            <p>Index: ${ index }</p>
            <p>Articles Count: ${ articlesCount }</p>
            <p>Links:
            <ul>${ links.map(link => html`
            <li><a href="${ link.to }">${ link.to }</a></li>`) }
            </ul>
            </p>
            <p>Title: ${ title }</p>
            <p>Title ends with period: ${ titleEndsWithPeriod }</p>
            <p>Slug: ${ this.slug }</p>
        </article>
    `;
  }
}

export default ElexChapter;
