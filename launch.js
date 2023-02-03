let contentType = 'text/html';
let content = `<html>
<body>
  <h1>Hello Halfstack!</h1>
  <div>
    This is from a web page?
  </div>
</body>
</html>`;



const textarea = document.getElementById('textarea');
textarea.value = content;
textarea.addEventListener('change', (event) => {
  console.log(event);
  content = event.target.value;
});

const input = document.getElementById('input');
input.value = contentType;
input.addEventListener('change', (event) => {
  console.log(event);
  contentType = event.target.value;
});

const canvas = document.getElementById('canvas');
const link = document.getElementById('link');



async function startHsync() {
  const con = await hsync.dynamicConnect(null, true);
  
  console.log('Password:', con.hsyncSecret);
  console.log('Admin connection:', con.webAdmin);
  link.href = con.webUrl;
  link.innerHTML = con.webUrl;

  const server = nodeHttpWeb.createServer((req, resp) => {
    console.log('req', req);
    resp.writeHead(200, {"Content-Type": contentType});
    resp.end(content);
  });
  server.listen(3000);

  QRCode.toCanvas(canvas, con.webUrl, {width: 400}, function (error) {
    if (error) console.error(error);
    canvas.style.width="400px";
    canvas.style.height="400px";
    console.log('success!');
  })

}

startHsync();