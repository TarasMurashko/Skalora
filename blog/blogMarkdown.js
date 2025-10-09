// Blog Markdown utilities: shared helper for blog rendering
function renderSimpleMarkdown(md) {
  md = md.replace(/```([\s\S]*?)```/g, function(match, code) {
    return '<pre><code>' + code.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])) + '</code></pre>';
  });
  md = md.replace(/`([^`]+?)`/g, function(match, code) {
    return '<code>' + code.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])) + '</code>';
  });
  let html = md
    .replace(/^### (.*)$/gim, '<h3>$1</h3>')
    .replace(/^## (.*)$/gim, '<h2>$1</h2>')
    .replace(/^# (.*)$/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*?)\*/gim, '<i>$1</i>')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank">$1</a>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  html = '<p>' + html + '</p>';
  return html;
}
