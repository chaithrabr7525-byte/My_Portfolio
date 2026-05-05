function renderEducation() {
  const container = document.getElementById('education-list');
  if (!container) return;

  educationData.forEach(edu => {
    const eduEntry = document.createElement('div');
    eduEntry.classList.add('education-entry');

    eduEntry.innerHTML = `
      <h3>${edu.degree}</h3>
      <p><strong>Institution:</strong> ${edu.institution}</p>
      <p><strong>Duration:</strong> ${edu.duration}</p>
      <p><strong>Location:</strong> ${edu.location}</p>
      ${edu.CGPA ? `<p><strong>CGPA:</strong> ${edu.CGPA}</p>` : ''}
      ${edu.Pct ? `<p><strong>Percentage:</strong> ${edu.Pct}</p>` : ''}
    `;

    container.appendChild(eduEntry);
  });
}

// Call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', renderEducation);
