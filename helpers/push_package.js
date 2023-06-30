const functions =require("firebase-functions");
const  admin =require("firebase-admin");
const fs =require("fs");
const path =require("path");
const express =require("express");
const crypto =require("crypto");
const forge =require("node-forge");
const archiver =require("archiver");

// const app = express();

// const server = app.listen(5000, () =>
//   console.log(`Listening on port ${5000}...`)
// );

module.exports =function pushPackage(app){
const iconFiles = [
    // "icon_16x16.png",
    // "icon_16x16@2x.png",
    // "icon_32x32.png",
    // "icon_32x32@2x.png",
    // "icon_128x128.png",
    // "icon_128x128@2x.png",
];

const websiteJson = {
    websiteName: "Family Pro Health",
    websitePushID: "web.com.familyprohealth.fph",
    allowedDomains: ["https://dev.familyprohealth.life","http://localhost:3000"],
    urlFormatString: "https://familyprohealth.com",
    authenticationToken: "",
    webServiceURL: "https://familyprohealth.com",
};

const p12Asn1 = forge.asn1.fromDer(fs.readFileSync("helpers/cert/Certificate.p12","binary"));
const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, );

const certBags = p12.getBags({bagType: forge.pki.oids.certBag});
const certBag = certBags[forge.pki.oids.certBag];
const cert = certBag[0].cert;

const keyBags = p12.getBags({bagType: forge.pki.oids.pkcs8ShroudedKeyBag});
const keyBag = keyBags[forge.pki.oids.pkcs8ShroudedKeyBag];
const key = keyBag[0].key;

const sPem=`-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBwsEfVkcW93HT
FbI1ZvHmZZOOY8ERfwlNNEkzG5KDQ7sOAdadvQku0+Si9emAZvnnyZDSlFhu2zUc
SfCJW8oxSV7iMyiJaRR0HIOuezJiac5fHyoEaM/wIm/F3hX3rcGWu07sKiWBJVBf
dBlL7A6VXaC4AKXB3x+Z5op/2C6qKtBNjh5tUREPPbMFVPb9kPuMRytUV4FdEnNb
xtLe4s0Y7NbUuFm6iXY6EfrYaYFWcdMYS1bKr9Lh6xh08rLjF05STzG/PSqmYqxs
yF9aM+jOthd5bIm33kFC3/s/n83dweeVnEabtZlWa24x7bIx2j+p6GmM3nFyc/7U
QuD/FAVJAgMBAAECggEAPak0vDxAs1ZbqskkxUnVgXSh2JZ2QpMi6qbRBKqpnYxY
YsTC/7/AxF46TIHlpS8gKFtE8z6yRdUMucvt+Eh1t+mZgHK3W8NM9wZ8AXLDPf5d
5neMb4rLYagT2ewrIX7yNH23SADBnq+5PCc+RaMBoRcCpovONDxFWjy7pqOtdglL
5183hU+eXrJOx0WoD3oOD4q1r5L1b0ophP0zo2UAvNqonisq9AhiZV1oDk+cp/IP
Aq8ZJ24HLr51yrxsDUXK3t5/vSf9SSPgYRLVBzpyk4h5IGMsy/PawFyav8lQopOr
WcqpTnQ5VIEBNFCjgl3T+QJlk7Q8KDP/RU2flWbBYQKBgQDtQee8E9v0hW/TxUf8
QxDsglhv/6c7I7C2brRol0j9xIjSz+jfq4RMCRx1r2fEfHZqlt5N77AYMlVsYXtr
+vhyG6MqmQvsJ4/f8vlDg1ljrb4w5QSEfWFzWCbHW/esUSJnXkagPFHWyVJHTsgW
Fk9OqkECAhhvorJ+oXEpaBXVFwKBgQDRETV4lamzMYRBVGvYl1HWjkr5EZyr7cZh
UYsXff6CayF4E+Ln83vniwIe/VApKxvTe3WH16uXX+CjncxtxaF17t+AFU5Hz23V
WdsDjy0U6gnparfKhGwHT3tM4CuDgJcU0dK3DWzlG429dNlQEOvIwIh9XXt6JZQK
vR5yhSQ0nwKBgQDGH33rIc5Qn8klV53oOvz781D0ndFBYmljvohqusKaHy9+k13M
wcalVApu//2wJ5sfIUMcY+ZyHj4VVkYhgp9LcmbL4KgDGXpcseKTDTFtOp4S6Hvg
Q29ISbmASv1E6S/IkAJ8NkLFELLjlxcg0pqBf0zv514Ogxd5BUmhISjyGwKBgHzJ
9s6pFofdEIImL9EyUSjt+hY8yvVckcLY91roW5fg9jNEO3YTwWttb7CrpsNL9en/
kSGqO8O4+M7wi2siQcOw9zrufLEkQPzOC4pOVaxcHdpzVozNCeY7LO+wBokRohxN
OacFnnAKSEpDisrdrr8/HLknqWI5N+pJA/l7OyclAoGALqO7GmU6SD4TRYz2pmvG
LbsuvYnPqDQXOnhLvbjbrpM7FWS5lrXHsQuaOgzFRtwWg3/uT6K+U8xFE1KqslM1
4YjYUCP9/Uy0KoxS0QA5WM2Ma2uEuPTHe1/36SBOkSeg+riFj9kkdon8gBj3c7Lq
e5Oz47nz4zgt47RZP6WpD78=
-----END PRIVATE KEY-----
`

const intermediate = forge.pki.privateKeyFromPem(sPem);

app.get("/:version/pushPackages/:websitePushId", async (req, res) => {

    if (!cert) {
        console.log("cert is null");
        res.sendStatus(500);
        return;
    }
    if (!key) {
        console.log("key is null");
        res.sendStatus(500);
        return;
    }
    const iconSourceDir = "...";
    res.setHeader("Content-Type","application/zip")
    res.attachment("pushpackage.zip");

    const archive = archiver("zip");

    archive.on("error", function (err) {
        res.status(500).send({ error: err.message });
        return;
    });

    archive.on("warning", function (err) {
        if (err.code === "ENOENT") {
            console.log(`Archive warning ${err}`);
        } else {
            throw err;
        }
    });

    archive.on("end", function () {
        console.log("Archive wrote %d bytes", archive.pointer());
    });

    archive.pipe(res);

    archive.directory(iconSourceDir, "icon.iconset");

    const manifest= {};

    const readPromises = [];

    iconFiles.forEach((i) =>
        readPromises.push(
            new Promise((resolve, reject) => {
                const hash = crypto.createHash("sha512");
                const readStream = fs.createReadStream(
                    path.join(iconSourceDir, i),
                    { encoding: "utf8" }
                );

                readStream.on("data", (chunk) => {
                    hash.update(chunk);
                });

                readStream.on("end", () => {
                    const digest = hash.digest("hex");
                    manifest[`icon.iconset/${i}`] = {
                        hashType: "sha512",
                        hashValue: `${digest}`,
                    };
                    resolve();
                });

                readStream.on("error", (err) => {
                    console.log(`Error on readStream for ${i}; ${err}`);
                    reject();
                });
            })
        )
    );

    try {
        await Promise.all(readPromises);
    } catch (error) {
        console.log(`Error writing files; ${error}`);

        res.sendStatus(500);
        return;
    }

    const webJSON = {
        ...websiteJson,
        ...{ authenticationToken: "..." },
    };
    const webHash = crypto.createHash("sha512");

    const webJSONString = JSON.stringify(webJSON);

    webHash.update(webJSONString);

    manifest["website.json"] = {
        hashType: "sha512",
        hashValue: `${webHash.digest("hex")}`,
    };

    const manifestJSONString = JSON.stringify(manifest);

    archive.append(webJSONString, { name: "website.json" });
    archive.append(manifestJSONString, { name: "manifest.json" });

    const p7 = forge.pkcs7.createSignedData();
    p7.content = forge.util.createBuffer(manifestJSONString, "utf8");
    p7.addCertificate(cert);
    // p7.addCertificate(intermediate);
    p7.addSigner({
        // @ts-ignore
        key,
        certificate: cert,
        digestAlgorithm: forge.pki.oids.sha256,
        authenticatedAttributes: [{
            type: forge.pki.oids.contentType,
            value: forge.pki.oids.data
          }, {
            type: forge.pki.oids.messageDigest
          }, {
            type: forge.pki.oids.signingTime,
            value: new Date().toString()
          }]
    });
    p7.sign({ detached: true });

    const pem = forge.pkcs7.messageToPem(p7);
    archive.append(Buffer.from(pem, 'binary'), { name: "signature" });

    // Have also tried this:
    // archive.append(forge.asn1.toDer(p7.toAsn1()).getBytes(), { name: "signature" });

    try {
        await archive.finalize();
    } catch (error) {
        console.log(`Error on archive.finalize(); ${error}`);

        res.sendStatus(500);
        return;
    }
});
}