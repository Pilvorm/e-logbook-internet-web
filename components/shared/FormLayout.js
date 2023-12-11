import BreadCrumbs from "components/custom/BreadcrumbCustom";
import { useRouter } from "next/router";
import { ArrowLeft, FileText } from "react-feather";
import { Button, Card } from "reactstrap";

const FormLayout = ({
  children,
  noBack,
  breadCrumbParent,
  breadCrumbActive,
  pageTitle,
  formHeader,
  formSubheader,
  formTitle,
  formSubtitle,
}) => {
  const router = useRouter();

  return (
    <>
      <BreadCrumbs {...{ breadCrumbParent, breadCrumbActive }} />
      <div className="d-flex align-items-center my-3">
        {!noBack && (
          <Button.Ripple
            outline
            type="submit"
            color="danger"
            className="btn-next"
            onClick={() => router.back()}
          >
            <ArrowLeft size={18} />
            <span className="ml-50 align-middle d-sm-inline-block d-none">
              Back to Previous Page
            </span>
          </Button.Ripple>
        )}
        <h2 className={`m-0 ${!noBack && "ml-2 pl-2 border-left-dark"}`}>
          {pageTitle}
        </h2>
      </div>
      <div className="d-flex">
        <div className="mr-1">
          <div
            className="d-flex justify-content-center align-items-center bg-primary rounded"
            style={{ width: "3rem", height: "3rem" }}
          >
            <FileText size={24} color="white" />
          </div>
        </div>
        <div className="w-100">
          <div style={{ height: "3rem" }}>
            <h5 className="m-0">{formHeader}</h5>
            <p className="text-muted m-0">{formSubheader}</p>
          </div>
          <div className="my-1"></div>
          <Card className="p-4">
            {formTitle && formSubtitle && (
              <div className="content-header mb-2">
                <h5 className="mb-0">{formTitle}</h5>
                <small className="text-muted">{formSubtitle}</small>
              </div>
            )}
            {children}
          </Card>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
