function ResourceLabel({ status }: { status: string | undefined }) {
  if (!status) {
    return null;
  }

  return (
    <span className={`tag is-large ml-4 resource-${status}`}>{status}</span>
  );
}

export default ResourceLabel;