async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function downloadLayout(photos: string[], selectedLayout: string) {
  if (photos.length === 0) return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Load all images first
  const images = await Promise.all(photos.map(src => loadImage(src)));

  if (selectedLayout === "layout-b") {
    // 2x2 Grid Layout
    // Canvas: 800 x 1100
    canvas.width = 800;
    canvas.height = 1100;

    // Background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.lineWidth = 16;
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

    // Inner Grid Area
    const leftOffset = 40;
    const topOffset = 40;
    const gap = 20;
    const itemW = (canvas.width - leftOffset * 2 - gap) / 2; // 350
    const itemH = 430;

    // Draw the 4 slots
    for (let i = 0; i < 4; i++) {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = leftOffset + col * (itemW + gap);
      const y = topOffset + row * (itemH + gap);

      // Border for slot
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#000000";
      ctx.strokeRect(x, y, itemW, itemH);

      if (images[i]) {
        ctx.drawImage(images[i], x + 2, y + 2, itemW - 4, itemH - 4);
      } else {
        ctx.fillStyle = "#F3F4F6";
        ctx.fillRect(x + 2, y + 2, itemW - 4, itemH - 4);
        ctx.fillStyle = "#9CA3AF";
        ctx.font = "bold 20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`SLOT 0${i + 1}`, x + itemW / 2, y + itemH / 2);
      }
    }

    // Text label
    ctx.fillStyle = "#2D2D2D";
    ctx.font = "black 28px Arial";
    ctx.textAlign = "center";
    ctx.fillText("★ PHOTOBOOTH LAYOUT B ★", canvas.width / 2, canvas.height - 70);

  } else if (selectedLayout === "hearts-filter") {
    // Vertical Strip Layout
    // Canvas: 400 x 1200
    canvas.width = 400;
    canvas.height = 1200;

    // Pink Background
    ctx.fillStyle = "#FFF0F2";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Pink Border
    ctx.lineWidth = 12;
    ctx.strokeStyle = "#FF8DA1";
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

    const leftOffset = 30;
    const topOffset = 30;
    const gap = 20;
    const itemW = canvas.width - leftOffset * 2; // 340
    const itemH = 240;

    for (let i = 0; i < 4; i++) {
      const x = leftOffset;
      const y = topOffset + i * (itemH + gap);

      ctx.lineWidth = 4;
      ctx.strokeStyle = "#FF8DA1";
      ctx.strokeRect(x, y, itemW, itemH);

      if (images[i]) {
        ctx.drawImage(images[i], x + 2, y + 2, itemW - 4, itemH - 4);
      } else {
        ctx.fillStyle = "#F9FAFB";
        ctx.fillRect(x + 2, y + 2, itemW - 4, itemH - 4);
        ctx.fillStyle = "#FF8DA1";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`SLOT 0${i + 1}`, x + itemW / 2, y + itemH / 2);
      }
    }

    ctx.fillStyle = "#FF6B91";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("♥ HEARTS FILTER ♥", canvas.width / 2, canvas.height - 70);

  } else if (selectedLayout === "dog-filter") {
    // Horizontal Strip Layout
    // Canvas: 1200 x 400
    canvas.width = 1200;
    canvas.height = 400;

    // Yellow Background
    ctx.fillStyle = "#FFF9EB";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Orange Border
    ctx.lineWidth = 12;
    ctx.strokeStyle = "#E6A04D";
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

    const leftOffset = 30;
    const topOffset = 30;
    const gap = 20;
    const itemW = 265;
    const itemH = 280;

    for (let i = 0; i < 4; i++) {
      const x = leftOffset + i * (itemW + gap);
      const y = topOffset;

      ctx.lineWidth = 4;
      ctx.strokeStyle = "#E6A04D";
      ctx.strokeRect(x, y, itemW, itemH);

      if (images[i]) {
        ctx.drawImage(images[i], x + 2, y + 2, itemW - 4, itemH - 4);
      } else {
        ctx.fillStyle = "#F9FAFB";
        ctx.fillRect(x + 2, y + 2, itemW - 4, itemH - 4);
        ctx.fillStyle = "#E6A04D";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`SLOT 0${i + 1}`, x + itemW / 2, y + itemH / 2);
      }
    }

    ctx.fillStyle = "#E6A04D";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("🐾 DOG FILTER LAYOUT 🐾", canvas.width / 2, canvas.height - 40);

  } else if (selectedLayout === "vintage-layout") {
    // Polaroid Stack Layout
    // Canvas: 900 x 900
    canvas.width = 900;
    canvas.height = 900;

    // Background
    ctx.fillStyle = "#F4EFE6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render 4 polaroids with rotations
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const polW = 320;
    const polH = 400;

    const rotations = [-12, -4, 4, 12];
    const offsetsX = [-120, -40, 40, 120];
    const offsetsY = [20, -10, -10, 20];

    for (let i = 0; i < 4; i++) {
      ctx.save();
      // Translate to item center
      const tx = centerX + offsetsX[i];
      const ty = centerY + offsetsY[i] - 30;
      ctx.translate(tx, ty);
      ctx.rotate((rotations[i] * Math.PI) / 180);

      // Polaroid paper shadow and base card
      ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 4;
      ctx.shadowOffsetY = 4;

      ctx.fillStyle = "#FAF6EE";
      ctx.fillRect(-polW / 2, -polH / 2, polW, polH);

      // Card border
      ctx.shadowColor = "transparent"; // Reset shadow for stroke
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#000000";
      ctx.strokeRect(-polW / 2, -polH / 2, polW, polH);

      // Photo slot inside card
      const picW = polW - 32;
      const picH = polH - 100;
      const px = -picW / 2;
      const py = -polH / 2 + 16;

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#000000";
      ctx.strokeRect(px, py, picW, picH);

      if (images[i]) {
        ctx.drawImage(images[i], px + 1, py + 1, picW - 2, picH - 2);
      } else {
        ctx.fillStyle = "#F3F4F6";
        ctx.fillRect(px + 1, py + 1, picW - 2, picH - 2);
        ctx.fillStyle = "#9CA3AF";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`SLOT 0${i + 1}`, 0, py + picH / 2);
      }

      // Polaroid bottom text
      ctx.fillStyle = "#4B5563";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`📷 VINTAGE 0${i + 1}`, 0, polH / 2 - 35);

      ctx.restore();
    }

    ctx.fillStyle = "#2D2D2D";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.fillText("★ VINTAGE RETRO STACK ★", canvas.width / 2, canvas.height - 50);

  } else if (selectedLayout === "solace-layout") {
    // Hero Grid Layout
    // Canvas: 800 x 600
    canvas.width = 800;
    canvas.height = 600;

    // Background
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.lineWidth = 14;
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(7, 7, canvas.width - 14, canvas.height - 14);

    const leftOffset = 30;
    const topOffset = 30;
    const gap = 20;

    // Left Hero (takes 2/3 width)
    const heroW = 460;
    const heroH = 460;
    const hx = leftOffset;
    const hy = topOffset;

    ctx.lineWidth = 4;
    ctx.strokeStyle = "#000000";
    ctx.strokeRect(hx, hy, heroW, heroH);

    if (images[0]) {
      ctx.drawImage(images[0], hx + 2, hy + 2, heroW - 4, heroH - 4);
    } else {
      ctx.fillStyle = "#F3F4F6";
      ctx.fillRect(hx + 2, hy + 2, heroW - 4, heroH - 4);
      ctx.fillStyle = "#9CA3AF";
      ctx.font = "bold 18px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("HERO SLOT 01", hx + heroW / 2, hy + heroH / 2);
    }

    // Right stack of 3 images
    const rightX = leftOffset + heroW + gap; // 510
    const itemW = canvas.width - rightX - leftOffset; // 260
    const itemH = (heroH - gap * 2) / 3; // 140

    for (let idx = 0; idx < 3; idx++) {
      const i = idx + 1;
      const y = topOffset + idx * (itemH + gap);

      ctx.lineWidth = 3;
      ctx.strokeStyle = "#000000";
      ctx.strokeRect(rightX, y, itemW, itemH);

      if (images[i]) {
        ctx.drawImage(images[i], rightX + 1, y + 1, itemW - 2, itemH - 2);
      } else {
        ctx.fillStyle = "#F3F4F6";
        ctx.fillRect(rightX + 1, y + 1, itemW - 2, itemH - 2);
        ctx.fillStyle = "#9CA3AF";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`SLOT 0${i + 1}`, rightX + itemW / 2, y + itemH / 2);
      }
    }

    ctx.fillStyle = "#2D2D2D";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("✧ SOLACE LAYOUT ✧", canvas.width / 2, canvas.height - 45);
  }

  // Trigger file download
  const link = document.createElement("a");
  link.download = `photobooth-${selectedLayout}-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}
