copyToClipboard = async (seqList) => {
  var textToCopy = "";
  seqList.forEach((s) => {
    textToCopy = textToCopy + s + "\n";
  });
  await navigator.clipboard.writeText(textToCopy);
  alert("Copied");
};

seqList = Array.from(document.querySelectorAll("textarea")).map((t) => t.value);
setTimeout(() => copyToClipboard(seqList), 3000);
