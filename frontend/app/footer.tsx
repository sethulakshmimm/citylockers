export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-6 mt-12 shadow-inner">
      <div className="container mx-auto text-center text-sm">
        &copy; {new Date().getFullYear()} City Lockers. All rights reserved.
      </div>
    </footer>
  );
}
