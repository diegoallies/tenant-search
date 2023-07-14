{Object.entries(selectedData).map(([key, value], index) => {
  const [section, source] = key.split("-");
  return (
    <p key={index} className="dialog-content-text">
      {`${section} ${source}: ${value}`}
    </p>
  );
})}