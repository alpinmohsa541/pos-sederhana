import Navbar from "../Navbar/Navbar"; // Pastikan path ini sesuai dengan lokasi file Navbar
import Sidebar from "../Sidebar/Sidebar"; // Pastikan path ini sesuai dengan lokasi file Sidebar

const SalesReport = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-2 col-lg-1 bg-light vh-100">
          <Sidebar />
        </div>

        {/* Konten Utama */}
        <div className="col-10 col-lg-11">
          {/* Navbar */}
          <Navbar />

          <div className="container-fluid">
            <div className="row">
              {/* Kolom utama untuk konten */}
              <div className="col-12 col-lg-10">
                <div className="row">
                  {/* Card pertama */}
                  <div className="col-12 col-lg-6">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card.</p>
                      </div>
                    </div>
                  </div>
                  {/* Card kedua */}
                  <div className="col-12 col-lg-6">
                    <div className="card mb-3">
                      <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Kecil untuk card */}
              <div className="col-12 col-lg-2">
                <div className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">This is a wider card.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
