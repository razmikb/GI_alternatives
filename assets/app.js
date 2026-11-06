(function () {
  "use strict";

  const PROGRAMMES = window.PROGRAMMES || [];

  // ---------- Templates (copied as plain text) ----------

  const TEMPLATES = {
    wanted: {
      title: "\"Wanted\" post for Freecycle, Buy Nothing or Facebook groups",
      text:
`WANTED: old laptop for a student (any condition, can be repaired)

Hi, I'm [first name], a [year] [course] student at [university] in [city]. I can't afford a laptop and need one for coursework, online exams and research. I would be very grateful for any old laptop you no longer use — even an older or slow one, or one with a broken battery. I can wipe it securely in front of you and collect it myself. I can show my student ID/proof of enrolment. Thank you!`
    },
    email: {
      title: "Email to your university",
      text:
`Subject: Request for help accessing a laptop for my studies

Dear [International Office / Student Support],

I am [full name], student number [number], a [year] [programme] student. I currently do not have a laptop and cannot afford to buy one, which makes it difficult to complete coursework, online assessments and research.

Could you please tell me whether:

1. the university has a hardship or emergency fund I can apply to (including as an international student);
2. there is a laptop loan scheme, or retired/surplus university laptops available to students;
3. library or department laptops can be borrowed for longer periods;
4. you know of any student association, alumni group or local organisation that donates devices?

I can provide proof of enrolment and any other documents you need. Thank you very much for your help.

Kind regards,
[Name, programme, email, phone]`
    },
    afghan: {
      title: "Message for Afghan students (to a programme or university)",
      text:
`Subject: Question about laptop / internet support for enrolled students

Dear [Programme / International Office / Student Support],

My name is [first name], and I am [applying to / enrolled in] [programme] [inside Afghanistan / as a refugee in (country) / at (university)]. I do not have a reliable laptop or internet connection, and internet access where I live is often interrupted.

Could you please tell me whether:

1. your programme offers laptops, data packages or connectivity support to students, and how to apply;
2. there is a hardship fund I can apply to as an Afghan [refugee / asylum seeker / international] student;
3. course materials can be downloaded for offline study, and deadlines can be extended during internet shutdowns?

I can provide proof of enrolment through your official portal. For safety reasons I would be grateful if my name and details are not shared publicly.

Kind regards,
[First name, programme, official email]`
    }
  };

  // ---------- Steps that work in almost any country ----------

  // `for` says who sees a step: "inside" (living in Afghanistan), "afghanAbroad"
  // (Afghan students elsewhere), "general" (everyone else). Default: everyone
  // except students inside Afghanistan, for whom campus and public-post advice
  // doesn't apply or isn't safe.
  const STEPS = [
    {
      for: ["inside", "afghanAbroad"],
      needs: ["laptop", "internet"],
      title: "Get a place on a programme first, then ask it for a device or data",
      html: `
        <p>Almost no programme gives a laptop just for asking. Most laptops and data packages for Afghans go only to people already accepted on a programme. Apply to the programmes below, then ask the coordinator directly whether there is laptop, data or "connectivity support".</p>
        <p>Intakes are small and irregular, so check their official pages often. <a href="#tpl-afghan">Use the Afghan message template →</a></p>`
    },
    {
      for: ["inside"],
      needs: ["internet"],
      title: "Make your data go further",
      html: `
        <ul>
          <li><strong>Choose programmes built for low bandwidth:</strong> SOLAx runs through WhatsApp, and the Digital Citizen Fund degree is designed for slow internet.</li>
          <li><strong>Download</strong> readings and lectures whenever you have a connection.</li>
          <li><strong>Use a phone hotspot</strong> with a cheap mobile bundle. Prices change, so check with your operator.</li>
          <li><strong>Keep mobile data as a fallback.</strong> Fibre is the service most affected by recent orders.</li>
          <li><strong>Do not buy or use Starlink.</strong> It is illegal in Afghanistan and devices are being seized.</li>
        </ul>`
    },
    {
      for: ["inside"],
      needs: ["laptop", "internet"],
      title: "Study privately and plan for shutdowns",
      html: `
        <p>Keep your studies private, and tell your programme coordinator early if you lose access. Share identity documents only on an official programme portal. <a href="#afghan-safety">Read the safety advice →</a></p>`
    },
    {
      needs: ["laptop", "internet"],
      title: "Ask your own university",
      badge: "Most likely to succeed",
      html: `
        <p>Contact, in this order:</p>
        <ul>
          <li><strong>International student office / student welfare office:</strong> ask whether there is a hardship, emergency or "student assistance" fund you can apply to, and whether international students are eligible.</li>
          <li><strong>IT department:</strong> ask whether they have retired or surplus laptops they lend or give to students. Some universities run formal schemes — for example, the <a href="https://www.uni-jena.de/en/271304/laptop-donation" target="_blank" rel="noopener">University of Jena</a> (Germany) lends donated, refurbished laptops to students free of charge for a semester, and <a href="https://www.hw.ac.uk/about/professional-services/information-services/it-essentials/laptop-loan-scheme" target="_blank" rel="noopener">Heriot-Watt University</a> (UK) offers long-term laptop and mi-fi loans to students in financial difficulty.</li>
          <li><strong>Library:</strong> most university libraries have computers you can use and many lend laptops short-term.</li>
          <li><strong>Your faculty/department and student union or student associations</strong> (including associations from your home country): they sometimes have small grants, or know staff and senior students replacing laptops.</li>
          <li data-medical><strong>Medical students:</strong> ask your medical faculty and medical student associations directly — they often know about professional charities and alumni donors.</li>
        </ul>
        <p><a href="#tpl-email">Use the email template →</a></p>`
    },
    {
      needs: ["internet"],
      title: "Get free connectivity",
      html: `
        <ul>
          <li><strong>eduroam:</strong> if your university is part of eduroam, your university login gives you free Wi-Fi on campus and at eduroam locations in over 100 countries. <a href="https://eduroam.org" target="_blank" rel="noopener">eduroam.org</a></li>
          <li><strong>Campus, library and public Wi-Fi:</strong> public libraries, municipal Wi-Fi and EU WiFi4EU hotspots in many European towns are free. <a href="https://wifi4eu.ec.europa.eu" target="_blank" rel="noopener">WiFi4EU</a></li>
          <li><strong>A phone hotspot:</strong> if you have a smartphone, a cheap prepaid data bundle shared to an old laptop is often the cheapest home connection.</li>
          <li data-refugee><strong>Refugees:</strong> some UNHCR-supported community connectivity centres offer free or low-cost Wi-Fi. Ask your local UNHCR office or partner. All UNHCR services are free.</li>
          <li><strong>Low-income internet schemes</strong> are listed below if any match your answers. They usually require residency and/or a low income.</li>
        </ul>`
    },
    {
      needs: ["laptop"],
      title: "Ask your local community for a donated laptop",
      html: `
        <p>Many people have an old laptop in a drawer. Post a "Wanted" request on:</p>
        <ul>
          <li><a href="https://www.freecycle.org" target="_blank" rel="noopener">Freecycle</a> and <a href="https://buynothingproject.org" target="_blank" rel="noopener">Buy Nothing</a> groups</li>
          <li>Local Facebook groups (city, neighbourhood, expat/international student, faith and community groups)</li>
          <li>Notice boards at your university, church/mosque/temple, or community centre</li>
        </ul>
        <p>Be specific and honest, show your enrolment proof only in person, and never send money.</p>
        <div class="tpl-inline" data-template="wanted"></div>`
    },
    {
      for: ["inside", "afghanAbroad", "general"],
      needs: ["laptop"],
      title: "Accept an older laptop and make it fast with lightweight Linux",
      html: `
        <p>A 6–10-year-old laptop that is too slow for Windows can run well with a free, lightweight operating system such as <strong>Linux Mint (Xfce edition)</strong>, <strong>Lubuntu</strong> or <strong>Zorin OS Lite</strong>. A web browser, LibreOffice and free PDF and reference tools cover most study needs. Adding a cheap SSD or extra RAM (often under €30 used) makes a huge difference.</p>
        <p class="small muted">Check first whether your course needs any Windows-only software or exam-proctoring tools.</p>`
    },
    {
      needs: ["laptop"],
      title: "Get it repaired for free at a Repair Café",
      html: `
        <p>If you are given a broken laptop, volunteers at a Repair Café can often fix it for free — there are over 4,000 worldwide. <a href="https://www.repaircafe.org" target="_blank" rel="noopener">Find one at repaircafe.org</a>. Local Linux user groups and university computer-science societies can also help with installation.</p>`
    },
    {
      needs: ["laptop", "internet"],
      title: "Ask an institution to apply on your behalf",
      html: `
        <p>Big refurbishers and charities (Labdoo, Computer Aid, Good Things Foundation, World Computer Exchange, and in Germany HEY, ALTER!) only give devices to organisations, not to individuals. If your university department, student association or a local NGO applies to them, the devices can then be distributed to students like you. Show this guide to your student union or international office and ask whether they would apply.</p>`
    }
  ];

  // ---------- Country notes ----------

  const COUNTRY_NOTES = {
    "Bulgaria": `There is no Bulgarian national scheme for individual university students, and Bulgarian donation campaigns mostly serve school pupils. Your best options are: the university library computers and eduroam/campus Wi-Fi; the international students' office and your national/international student association; asking senior students and staff who are upgrading; and Freecycle/Facebook "Wanted" posts in local and expat groups (e.g. Pleven and Sofia).`,
    "Afghanistan": `Women have been banned from universities in Afghanistan since December 2022, so online study is the only route that needs no travel. Fibre internet is being restricted, so plan for interruptions. Almost everything below is for women and girls. For men inside Afghanistan we found very little: AUAF online and ICCR are the main options, and neither provides a device. None of the programmes that provide a laptop or data has a confirmed open intake right now.`,
    "Iran": `We could not verify any national scheme in Iran that gives laptops to individual university students. For refugees, UNHCR DAFI is the main funded route. Ask your university about hardship funds and library or lab computers.`,
    "Other": `We could not verify any current national scheme in your country that gives laptops to individual university students. Ask your university first; some universities and state/provincial governments run occasional laptop distributions or student-discount schemes. The steps below work almost anywhere.`
  };

  // Shown only to Afghan students in that country
  const AFGHAN_NOTES = {
    "Pakistan": `Pakistan has frozen or delayed many Afghan student visas. A Pakistan Medical and Dental Council directive dated 1 September 2026 barred new admissions of Afghans to medical and dental programmes and told those already enrolled to return to Afghanistan (reported by Arab News). For refugees with a PoR card, UNHCR DAFI is the main funded route.`
  };

  const INTL_LABEL = {
    yes: "Yes",
    notExcluded: "Not excluded",
    check: "Check",
    unlikely: "Unlikely",
    no: "No"
  };

  // ---------- Helpers ----------

  const $ = (sel, root = document) => root.querySelector(sel);

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function countries() {
    const set = new Set();
    PROGRAMMES.forEach(p => p.countries.forEach(c => c !== "*" && set.add(c)));
    return [...set].sort();
  }

  function linkHtml(p) {
    if (p.url) {
      const label = p.urlText || p.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
      return `<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(label)}</a>`;
    }
    return esc(p.urlText || "—");
  }

  function sourcesHtml(p) {
    if (!p.sources || !p.sources.length) return "";
    return `<details class="sources"><summary>Sources</summary><ul>${
      p.sources.map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a></li>`).join("")
    }</ul></details>`;
  }

  async function copyText(text, btn) {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { ok = document.execCommand("copy"); } catch (_) { ok = false; }
      ta.remove();
    }
    const original = btn.dataset.label || btn.textContent;
    btn.dataset.label = original;
    btn.textContent = ok ? "Copied ✓" : "Select the text and copy it";
    setTimeout(() => { btn.textContent = original; }, 2000);
  }

  function templateHtml(key, withId) {
    const t = TEMPLATES[key];
    return `
      <div class="template"${withId ? ` id="tpl-${key}"` : ""}>
        <div class="template-head">
          <h3>${esc(t.title)}</h3>
          <button type="button" class="btn" data-copy="${key}">Copy</button>
        </div>
        <pre>${esc(t.text)}</pre>
      </div>`;
  }

  // ---------- Matching ----------

  const REQUIRE_KEYS = ["lowIncome", "pell", "refugee", "medical", "woman"];

  function inCountry(p, country) {
    if (p.excludeCountries && p.excludeCountries.includes(country)) return false;
    return p.countries.includes("*") || p.countries.includes(country);
  }

  function evaluate(p, a) {
    if (!inCountry(p, a.country)) return null;
    if (p.afghan === "only" && !a.afghan) return null;
    if (a.inside && !p.afghan) return null;
    const studyOnly = p.needs.includes("study");
    if (!studyOnly && !p.needs.some(n => a.needs.includes(n))) return null;

    if (p.blocker) return { group: "no", reason: p.blocker };
    if (a.intl && p.intl === "no") return { group: "no", reason: `Not open to international students (${p.intlText})` };
    if (p.requires && !p.requires.some(r => a[r])) return { group: "no", reason: p.requiresText || "You may not meet the requirements" };
    if (p.school) return { group: "school" };
    if (studyOnly) return { group: "study" };
    if (p.individual === "no") return { group: "org" };
    return { group: "try" };
  }

  function sortRank(p) {
    if (p.id === "university") return 0;
    return p.countries.includes("*") ? 2 : 1;
  }

  function programmeCard(p, a) {
    const intlNote = a.intl && (p.intl === "check" || p.intl === "unlikely")
      ? `<p class="note">International students: <strong>${esc(p.intlText)}</strong> — ask before applying.</p>` : "";
    const warn = p.warning ? `<p class="note warn-note">${esc(p.warning)}</p>` : "";
    return `
      <article class="prog">
        <header>
          <h4>${esc(p.name)}</h4>
          <span class="where">${esc(p.where)}</span>
        </header>
        <dl>
          <dt>Who qualifies</dt><dd>${esc(p.who)}</dd>
          <dt>How to apply</dt><dd>${esc(p.individualText)}</dd>
          <dt>Cost</dt><dd>${esc(p.cost)}</dd>
          <dt>Website</dt><dd>${linkHtml(p)}</dd>
        </dl>
        ${intlNote}${warn}
        <p class="checked">Last checked: ${esc(p.checked)}</p>
        ${sourcesHtml(p)}
      </article>`;
  }

  function renderResults(a) {
    const out = $("#results");
    const needLabel = a.needs.length === 2 ? "a laptop and internet" : a.needs[0] === "laptop" ? "a laptop" : "internet";
    const countryLabel = a.country === "Other" ? "a country not listed" : a.country;

    const groups = { try: [], org: [], school: [], study: [], no: [] };
    PROGRAMMES.forEach(p => {
      const r = evaluate(p, a);
      if (r) groups[r.group].push({ p, reason: r.reason });
    });
    Object.values(groups).forEach(g => g.sort((x, y) => sortRank(x.p) - sortRank(y.p)));

    const audience = a.inside ? "inside" : a.afghan ? "afghanAbroad" : "general";
    const steps = STEPS.filter(s =>
      (s.for || ["afghanAbroad", "general"]).includes(audience) &&
      s.needs.some(n => a.needs.includes(n)));
    const notes = [COUNTRY_NOTES[a.country], a.afghan && AFGHAN_NOTES[a.country]].filter(Boolean);

    const summary = a.inside
      ? `You are in <strong>Afghanistan</strong> and need <strong>${needLabel}</strong>.`
      : `You study in <strong>${esc(countryLabel)}</strong>, ${a.intl ? "as an <strong>international student</strong>" : "<strong>not</strong> as an international student"}, and need <strong>${needLabel}</strong>.`;

    let html = `
      <div class="results-head">
        <h2>Your options</h2>
        <p class="muted">${summary} <a href="#find">Change answers</a></p>
      </div>`;

    html += notes.map(n => `<div class="card info"><p>${n}</p></div>`).join("");

    let section = 0;
    const heading = text => `<h3 class="group-title">${++section}. ${text}</h3>`;

    html += `${heading("Start with these steps")}
      <p class="muted">${a.afghan
        ? "Work through them in order. Every route below involves joining a study programme or a local scheme."
        : "Work through them in order. Most students who get a free or near-free laptop get it through the first few."}</p>
      <ol class="steps">${steps.map(s => `
        <li class="step">
          <h4>${esc(s.title)}${s.badge ? ` <span class="badge">${esc(s.badge)}</span>` : ""}</h4>
          ${s.html}
        </li>`).join("")}
      </ol>`;

    html += heading("Programmes worth trying");
    html += groups.try.length
      ? `<div class="prog-list">${groups.try.map(x => programmeCard(x.p, a)).join("")}</div>`
      : `<p class="muted">No specific programme matched your answers. The steps above are your best route.</p>`;

    if (groups.org.length) {
      html += `${heading("Ask your university or a local organisation to apply for you")}
        <p class="muted">These only give devices or connectivity to organisations, not to individuals. Show them to your student union or international office.</p>
        <div class="prog-list">${groups.org.map(x => programmeCard(x.p, a)).join("")}</div>`;
    }

    if (groups.school.length) {
      html += `${heading("No school-leaving certificate yet? Start here")}
        <p class="muted">A university needs a school-leaving certificate. These online schools are a realistic first step towards a degree.</p>
        <div class="prog-list">${groups.school.map(x => programmeCard(x.p, a)).join("")}</div>`;
    }

    if (groups.study.length) {
      html += `${heading("Free study and information, with no device or data")}
        <p class="muted">These won't give you a laptop or internet, but a place on a programme is often what opens up other support.</p>
        <div class="prog-list">${groups.study.map(x => programmeCard(x.p, a)).join("")}</div>`;
    }

    if (groups.no.length) {
      html += `<details class="not-for-you">
        <summary>Programmes that probably don't fit you (${groups.no.length})</summary>
        <ul>${groups.no.map(x => `<li><strong>${esc(x.p.name)}</strong> — ${esc(x.reason)}</li>`).join("")}</ul>
      </details>`;
    }

    html += a.afghan
      ? `<div class="card warn compact">
      <p><strong>Never pay any fee, and never send passport or Tazkira scans to WhatsApp "agents".</strong> Use only official programme websites. <a href="#afghan-safety">Safety advice for Afghan students →</a></p>
    </div>`
      : `<div class="card warn compact">
      <p><strong>Never pay any fee for a "free" laptop</strong>, and check that websites are official (.gov or your university). <a href="#scams">More scam warnings →</a></p>
    </div>`;

    out.innerHTML = html;
    if (!a.medical) out.querySelectorAll("[data-medical]").forEach(el => el.remove());
    if (!a.refugee) out.querySelectorAll("[data-refugee]").forEach(el => el.remove());
    out.querySelectorAll(".tpl-inline").forEach(el => { el.innerHTML = templateHtml(el.dataset.template, false); });
    out.hidden = false;
    out.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // ---------- All-programmes table ----------

  function renderTable() {
    const country = $("#f-country").value;
    const need = $("#f-need").value;
    const q = $("#f-search").value.trim().toLowerCase();
    const self = $("#f-self").checked;
    const intl = $("#f-intl").checked;
    const afghan = $("#f-afghan").checked;

    const rows = PROGRAMMES.filter(p => {
      if (country && !inCountry(p, country)) return false;
      if (need && !p.needs.includes(need)) return false;
      if (self && p.individual === "no") return false;
      if (intl && p.intl === "no") return false;
      if (afghan && !p.afghan) return false;
      if (q) {
        const hay = [p.name, p.where, p.who, p.cost, p.intlText, p.individualText, p.blocker || ""].join(" ").toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    $("#f-count").textContent = `Showing ${rows.length} of ${PROGRAMMES.length} programmes`;

    if (!rows.length) {
      $("#table").innerHTML = `<p class="muted">No programmes match these filters.</p>`;
      return;
    }

    $("#table").innerHTML = `
      <table class="ptable">
        <thead><tr>
          <th>Programme</th><th>Where</th><th>Who qualifies</th><th>Apply yourself?</th>
          <th>Int'l students?</th><th>Cost</th><th>Website</th><th>Last checked</th>
        </tr></thead>
        <tbody>${rows.map(p => `
          <tr${p.blocker ? ` class="inactive"` : ""}>
            <td data-label="Programme"><strong>${esc(p.name)}</strong>${p.blocker ? `<span class="flag">${esc(p.blocker)}</span>` : ""}</td>
            <td data-label="Where">${esc(p.where)}</td>
            <td data-label="Who qualifies">${esc(p.who)}</td>
            <td data-label="Apply yourself?">${esc(p.individualText)}</td>
            <td data-label="Int'l students?"><span class="pill pill-${p.intl}">${esc(INTL_LABEL[p.intl] || p.intl)}</span> ${p.intlText !== INTL_LABEL[p.intl] && p.intlText !== "—" ? `<span class="small">${esc(p.intlText)}</span>` : ""}</td>
            <td data-label="Cost">${esc(p.cost)}</td>
            <td data-label="Website">${linkHtml(p)}${sourcesHtml(p)}</td>
            <td data-label="Last checked">${esc(p.checked)}</td>
          </tr>`).join("")}
        </tbody>
      </table>`;
  }

  // ---------- Init ----------

  function init() {
    const list = countries();
    const countrySel = $("#country");
    countrySel.insertAdjacentHTML("beforeend",
      list.map(c => `<option>${esc(c)}</option>`).join("") +
      `<option value="Other">Another country</option>`);
    $("#f-country").insertAdjacentHTML("beforeend", list.map(c => `<option>${esc(c)}</option>`).join(""));

    // Show or hide the questions that depend on other answers
    function updateQuiz() {
      const us = countrySel.value === "United States";
      const inside = countrySel.value === "Afghanistan";
      const afghanInput = $("#afghan-choice input");

      $("#pell-choice").hidden = !us;
      if (!us) $("#pell-choice input").checked = false;

      // Studying online from inside Afghanistan: "international student" doesn't apply
      $("#intl-q").hidden = inside;
      $("#intl-q input").required = !inside;

      $("#afghan-choice").hidden = inside;
      if (inside) afghanInput.checked = false;

      const afghan = inside || afghanInput.checked;
      $("#woman-choice").hidden = !afghan;
      if (!afghan) $("#woman-choice input").checked = false;
    }
    countrySel.addEventListener("change", updateQuiz);
    $("#afghan-choice input").addEventListener("change", updateQuiz);

    $("#quiz").addEventListener("submit", e => {
      e.preventDefault();
      const f = e.target;
      const need = f.need.value;
      const inside = f.country.value === "Afghanistan";
      const a = {
        country: f.country.value,
        inside,
        afghan: inside || f.afghan.checked,
        intl: !inside && f.intl.value === "yes",
        needs: need === "both" ? ["laptop", "internet"] : [need]
      };
      REQUIRE_KEYS.forEach(k => { a[k] = f[k].checked; });
      renderResults(a);
    });

    ["#f-country", "#f-need", "#f-self", "#f-intl", "#f-afghan"].forEach(s => $(s).addEventListener("change", renderTable));
    $("#f-search").addEventListener("input", renderTable);
    renderTable();

    $("#template-list").innerHTML = Object.keys(TEMPLATES).map(k => templateHtml(k, true)).join("");

    document.addEventListener("click", e => {
      const btn = e.target.closest("[data-copy]");
      if (btn) copyText(TEMPLATES[btn.dataset.copy].text, btn);
    });
  }

  init();
})();
