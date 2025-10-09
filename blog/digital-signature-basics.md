# Basic Principles of Digital Signatures: Why, How, and What's Next

## Why Use Digital Signatures?
Traditional ink signatures can be forged or tampered with; digital signatures guarantee authenticity and integrity in the electronic world. Businesses, governments, and individuals use them for secure document workflows, verifying the sender, and ensuring no one has changed the document after signing.

## What Is a Digital Signature and How Does It Work?
A digital signature uses math, not images. It is based on cryptographic keys:
- **Private key:** Only you have it. Used for signing.
- **Public key:** You can safely share it. Used for verification.

When you sign something digitally, you’re not just scribbling on a PDF—you generate a cryptographic "fingerprint" unique to the document and your key. Anyone can check that fingerprint with your public key.

## What Really Happens: Step by Step
1. **Document Hash:** The software makes a checksum (hash) of the document. If even one letter changes, the hash is different.
2. **Sign the Hash:** The hash is encrypted with your private key. This is the digital signature.
3. **Distribute:** You share the signed document.
4. **Verify:** A recipient uses your public key to decrypt the signature and checks if their hash matches yours. If yes, (a) you signed it, and (b) it wasn’t modified.

## What's Next? Where to Use and How to Try
**Where used:**
- Electronic document management & e-government
- Banking, contracts, invoicing, legal services
- Software updates/package managers (e.g., verifying downloads)

**Try it yourself:**
- Free tools for testing: OpenSSL, online signature verifiers, or built-in tools in eID software.
- Research your country’s legal framework for digital (qualified/advanced) electronic signatures if you plan to sign contracts.
- Explore integrations with DocuSign, Adobe Sign, or your national ID solution.

**Useful links:**
- [Wiki: Digital signature](https://en.wikipedia.org/wiki/Digital_signature)
- [DSTU 4145-2002 standard](https://zakon.isu.net.ua/sites/default/files/normdocs/DSTU_4145-2002.pdf)
