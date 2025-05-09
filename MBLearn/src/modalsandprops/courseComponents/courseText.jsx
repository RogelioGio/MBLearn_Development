import Week7PDF from './week7.pdf';

const CourseText = () => {
    //This is will be recycled for Comp-e-Learn's docx and pdf import
    return(
        <>
            {/* PDF */}
            <iframe
            src={Week7PDF}
            className="w-full border rounded-lg shadow h-[calc(100vh-11.5rem)]"
            title="PDF Viewer"
            />
            {/* Docs sample */}
            <iframe
            src="https://docs.google.com/gview?url=https://drive.google.com/uc?export=download&id=1E1u7c3kKYBljDgahF9hqeTA7vLFjd4sM&embedded=true"
            width="100%"
            height="600px"
            className="rounded-lg shadow"
            title="Google Docs Viewer"
            />
        </>
    )
}
export default CourseText
