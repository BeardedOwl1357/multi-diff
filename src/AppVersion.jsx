function AppVersion() {
  return (
    <div style={{ fontSize: 'smaller', color: '#888' }}>
      Commit SHA: {import.meta.env.VITE_COMMIT_SHA}
    </div>
  );
}

export default AppVersion;
