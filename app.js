const art = document.getElementById('art-film');
const status = document.getElementById('playback-message');
document.querySelectorAll('[data-seek]').forEach(button => button.addEventListener('click', async () => {
  art.currentTime = Number(button.dataset.seek);
  art.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
  try { await art.play(); status.textContent = ''; }
  catch { status.textContent = '已跳转到所选章节，请点播放器上的播放按钮。'; }
}));
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('play', () => document.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); }));
  video.addEventListener('error', () => { status.textContent = '视频未能加载。你可以使用影片下方的下载入口，或稍后重试。'; });
});
document.getElementById('copy-prompt').addEventListener('click', async () => {
  const output = document.getElementById('copy-status');
  try { await navigator.clipboard.writeText(document.querySelector('.prompt').textContent); output.textContent = '已复制创作起点'; }
  catch { output.textContent = '浏览器未允许复制，请选中文字复制，或使用“保存文本”。'; }
});
