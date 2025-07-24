async function loadHTML(filePath) {
  const response = await fetch(filePath);
  return await response.text();
}

function assessSecurity(htmlContent) {
  const results = {
    inlineScripts: htmlContent.match(/<script[^>]*>[^<]*<\/script>/gi) || [],
    externalScripts: htmlContent.match(/<script[^>]*src=["'][^"']+["']/gi) || [],
    iframes: htmlContent.match(/<iframe[^>]*>/gi) || [],
    mixedContentLinks: htmlContent.match(/http:\/\/[^"'\s>]+/gi) || [],
    formElements: htmlContent.match(/<form[^>]*>/gi) || [],
  };

  const qualification = {
    score: 100,
    issues: [],
  };

  if (results.inlineScripts.length > 0) {
    qualification.score -= 20;
    qualification.issues.push("Inline scripts detected");
  }
  if (results.iframes.length > 0) {
    qualification.score -= 15;
    qualification.issues.push("Use of iframe elements");
  }
  if (results.mixedContentLinks.length > 0) {
    qualification.score -= 25;
    qualification.issues.push("Mixed content via unsecured HTTP links");
  }

  return qualification;
}

function generateReport(qualification, fileName) {
  const issuesList = qualification.issues.map(
    issue => `<li>${issue}</li>`
  ).join("");

  return `
    <h2>Security Audit Report for ${fileName}</h2>
    <p>Security Score: <strong>${qualification.score}/100</strong></p>
    <ul>${issuesList}</ul>
  `;
}

// 🧪 Runner Example
(async function runAudit() {
  const html1 = await loadHTML('file1.html');
  const html2 = await loadHTML('file2.html');

  const report1 = assessSecurity(html1);
  const report2 = assessSecurity(html2);

  const finalReportHTML = `
    <html>
      <body>
        ${generateReport(report1, 'file1.html')}
        ${generateReport(report2, 'file2.html')}
      </body>
    </html>
  `;

  document.body.innerHTML = finalReportHTML;
})();