import { jsPDF } from "jspdf";
import Geogrotesque from "../../fonts/Geogrotesque";
import GeogrotesqueBold from "../../fonts/GeogrotesqueBold";
/**
 * Generates and saves a pdf of a certificate
 *
 * @param name
 * @param toolName
 *
 */

async function createCertificate(
    name: string,
    toolName: string,
): Promise<void> {
    // Initialize document
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "pt",
    });

    // starting alignment for text
    const alignment = 243;

    // add fonts
    doc.addFileToVFS("Geogrotesque.ttf", Geogrotesque);
    doc.addFont("Geogrotesque.ttf", "Geogrotesque", "normal");

    doc.addFileToVFS("GeogrotesqueBold.ttf", GeogrotesqueBold);
    doc.addFont("GeogrotesqueBold.ttf", "GeogrotesqueBold", "normal");

    // display images
    const logo = new Image();
    logo.src = "/assets/hug-logo-2.png";
    await logo.decode();
    doc.addImage(
        logo,
        "PNG",
        alignment,
        50,
        (31 * logo.width) / logo.height,
        31,
    );

    const graphic = new Image();
    graphic.src = "/assets/certificate-graphic.png";
    await graphic.decode();
    doc.addImage(graphic, "PNG", 0, 91, 138, 425);

    const ubc = new Image();
    ubc.src = "/assets/ubc.png";
    await ubc.decode();
    doc.addImage(
        ubc,
        "PNG",
        alignment * 2,
        50,
        (31 * logo.width) / logo.height,
        31,
    );

    const signature = new Image();
    signature.src = "/assets/signature.png";
    await signature.decode();
    doc.addImage(
        signature,
        "PNG",
        alignment,
        422,
        (44 * logo.width) / logo.height,
        44,
    );

    // write static text
    doc.setFont("Geogrotesque");
    doc.setFontSize(16);
    doc.text(
        `${new Date(Date.now()).toLocaleString().split(",")[0]}`,
        alignment,
        154,
    );
    doc.text(`has successfully completed`, alignment, 252);
    doc.text(
        [
            `a module developed by HeadsUpGuys, a program of The University of British`,
            `Columbia (UBC), operating under the leadership of Dr. John Ogrodniczuk,`,
            `Professor of Psychiatry and the Director of the Psychotherapy Program at UBC`,
        ],
        alignment,
        313,
    );

    doc.setFontSize(11);
    doc.text(
        [
            `John S. Ogrodniczuk, Ph.D.`,
            `Professor, Director, Psychotherapy Program`,
            `Department of Psychiatry, University of British Columbia`,
        ],
        alignment,
        481,
    );

    // write dynamic text
    doc.setFont("GeogrotesqueBold");
    doc.setFontSize(38);
    doc.text(name, alignment, 195 + 38 / 2);

    doc.setFontSize(20);
    doc.text(toolName.toUpperCase(), alignment, 285);

    // save
    doc.save(`certificate.pdf`);
}

export { createCertificate };
