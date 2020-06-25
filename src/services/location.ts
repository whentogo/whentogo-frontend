export async function getCurrentPosition(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords),
      (err) => reject(err),
    );
  });
}

export async function recordPosition() {
  return null;
}
