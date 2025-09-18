import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

function AdminDashboard() {
  const [studentsData, setStudentsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  // Mock data based on your Google Sheets structure
  const mockData = [
    {
      id: 1,
      timestamp: "9/18/2025 9:19:00",
      namaLengkap: "Sabil",
      berapaBersaudara: "50",
      anakKe: "53",
      orangTuaLengkap: "Masih",
      terakhirTinggal: "Teman",
      dariKecilTinggal: "Ortu",
      orangBernilai: "Ilham",
      inginKatakan: "Ilham yok ngoding",
      akanDiberikan: "Perawat / Kaigo",
      kenapa: "Suka Makan",
      harapan: "Semoga HBD"
    },
    {
      id: 2,
      timestamp: "9/18/2025 10:30:00",
      namaLengkap: "Andi Pratama",
      berapaBersaudara: "3",
      anakKe: "2",
      orangTuaLengkap: "Masih",
      terakhirTinggal: "Orangtua",
      dariKecilTinggal: "Orangtua",
      orangBernilai: "Mama",
      inginKatakan: "Terima kasih sudah merawat aku dengan baik",
      akanDiberikan: "Rumah yang nyaman",
      kenapa: "Selalu ada saat aku butuh",
      harapan: "Semoga sehat selalu"
    },
    {
      id: 3,
      timestamp: "9/18/2025 11:45:00",
      namaLengkap: "Sari Dewi",
      berapaBersaudara: "2",
      anakKe: "1",
      orangTuaLengkap: "Tidak",
      terakhirTinggal: "Nenek",
      dariKecilTinggal: "Nenek",
      orangBernilai: "Nenek",
      inginKatakan: "Nenek adalah segalanya buat saya",
      akanDiberikan: "Biaya pengobatan terbaik",
      kenapa: "Dia yang membesarkan saya",
      harapan: "Semoga panjang umur"
    },
    {
      id: 4,
      timestamp: "9/18/2025 12:15:00",
      namaLengkap: "Budi Santoso",
      berapaBersaudara: "4",
      anakKe: "3",
      orangTuaLengkap: "Masih",
      terakhirTinggal: "Orangtua",
      dariKecilTinggal: "Orangtua",
      orangBernilai: "Papa",
      inginKatakan: "Papa adalah panutan hidup saya",
      akanDiberikan: "Modal usaha untuk expand bisnis",
      kenapa: "Dia yang mengajarkan kerja keras",
      harapan: "Semoga sukses terus"
    },
    {
      id: 5,
      timestamp: "9/18/2025 13:22:00",
      namaLengkap: "Maya Putri",
      berapaBersaudara: "1",
      anakKe: "1",
      orangTuaLengkap: "Tidak",
      terakhirTinggal: "Kakak",
      dariKecilTinggal: "Kakak",
      orangBernilai: "Kakak",
      inginKatakan: "Makasih kak sudah jadi orangtua kedua",
      akanDiberikan: "Apartemen yang nyaman",
      kenapa: "Dia yang membiayai sekolah saya",
      harapan: "Semoga bahagia dengan keluarganya"
    },
    {
      id: 6,
      timestamp: "9/18/2025 14:35:00",
      namaLengkap: "Rudi Hermawan",
      berapaBersaudara: "5",
      anakKe: "4",
      orangTuaLengkap: "Masih",
      terakhirTinggal: "Kost",
      dariKecilTinggal: "Ortu",
      orangBernilai: "Mama",
      inginKatakan: "Mama adalah malaikat di hidup saya",
      akanDiberikan: "Umroh dan haji",
      kenapa: "Pengorbanannya luar biasa",
      harapan: "Semoga selalu dalam lindungan Allah"
    }
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStudentsData(mockData);
      setFilteredStudents(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter students based on search term
    const filtered = studentsData.filter(student =>
      student.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.orangBernilai.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.inginKatakan.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, studentsData]);

  const handleLogout = () => {
    navigate('/admin');
  };

  const handleViewDetail = (student) => {
    setSelectedStudent(student);
  };

  const handleCloseDetail = () => {
    setSelectedStudent(null);
  };

  const handleExportData = () => {
    // Create CSV content
    const headers = [
      'Timestamp', 'Nama Lengkap', 'Berapa Bersaudara', 'Anak Ke', 
      'Orang Tua Lengkap', 'Terakhir Tinggal', 'Dari Kecil Tinggal',
      'Orang Bernilai', 'Ingin Katakan', 'Akan Diberikan', 'Kenapa', 'Harapan'
    ];
    
    const csvContent = [
      headers.join(','),
      ...filteredStudents.map(student => [
        student.timestamp,
        `"${student.namaLengkap}"`,
        student.berapaBersaudara,
        student.anakKe,
        student.orangTuaLengkap,
        `"${student.terakhirTinggal}"`,
        `"${student.dariKecilTinggal}"`,
        `"${student.orangBernilai}"`,
        `"${student.inginKatakan}"`,
        `"${student.akanDiberikan}"`,
        `"${student.kenapa}"`,
        `"${student.harapan}"`
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `data-siswa-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading data siswa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>📊 Dashboard Admin - Data Siswa</h1>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="search-section">
          <div className="search-container">
            <div className="search-header">
              <input
                type="text"
                placeholder="🔍 Cari siswa berdasarkan nama, orang bernilai, atau pesan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button className="export-btn" onClick={handleExportData}>
                📊 Export CSV
              </button>
            </div>
            <div className="search-info">
              Menampilkan {filteredStudents.length} dari {studentsData.length} siswa
            </div>
          </div>
        </div>

        <div className="students-grid">
          {filteredStudents.map(student => (
            <div key={student.id} className="student-card">
              <div className="student-header">
                <h3>{student.namaLengkap}</h3>
                <span className="timestamp">{student.timestamp}</span>
              </div>
              
              <div className="student-info">
                <div className="info-item">
                  <strong>Bersaudara:</strong> {student.berapaBersaudara} (Anak ke-{student.anakKe})
                </div>
                <div className="info-item">
                  <strong>Orang Tua:</strong> {student.orangTuaLengkap}
                </div>
                <div className="info-item">
                  <strong>Orang Bernilai:</strong> {student.orangBernilai}
                </div>
                <div className="info-item message">
                  <strong>Pesan:</strong> "{student.inginKatakan}"
                </div>
              </div>

              <button 
                className="view-detail-btn"
                onClick={() => handleViewDetail(student)}
              >
                👁️ Lihat Detail
              </button>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="no-results">
            <p>❌ Tidak ada siswa yang ditemukan dengan kriteria pencarian "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedStudent && (
        <div className="modal-overlay" onClick={handleCloseDetail}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detail Siswa: {selectedStudent.namaLengkap}</h2>
              <button className="close-btn" onClick={handleCloseDetail}>✕</button>
            </div>
            
            <div className="modal-body">
              <div className="detail-section">
                <h3>📝 Informasi Dasar</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Nama Lengkap:</label>
                    <span>{selectedStudent.namaLengkap}</span>
                  </div>
                  <div className="detail-item">
                    <label>Berapa Bersaudara:</label>
                    <span>{selectedStudent.berapaBersaudara}</span>
                  </div>
                  <div className="detail-item">
                    <label>Anak Ke:</label>
                    <span>{selectedStudent.anakKe}</span>
                  </div>
                  <div className="detail-item">
                    <label>Orang Tua Lengkap:</label>
                    <span>{selectedStudent.orangTuaLengkap}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>🏠 Informasi Tempat Tinggal</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Terakhir Tinggal Dengan:</label>
                    <span>{selectedStudent.terakhirTinggal}</span>
                  </div>
                  <div className="detail-item">
                    <label>Dari Kecil Tinggal Dengan:</label>
                    <span>{selectedStudent.dariKecilTinggal}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>❤️ Orang Bernilai</h3>
                <div className="detail-grid">
                  <div className="detail-item full-width">
                    <label>Orang yang Paling Bernilai:</label>
                    <span>{selectedStudent.orangBernilai}</span>
                  </div>
                  <div className="detail-item full-width">
                    <label>Ingin Katakan:</label>
                    <span>"{selectedStudent.inginKatakan}"</span>
                  </div>
                  <div className="detail-item full-width">
                    <label>Akan Diberikan:</label>
                    <span>{selectedStudent.akanDiberikan}</span>
                  </div>
                  <div className="detail-item full-width">
                    <label>Kenapa Berarti:</label>
                    <span>{selectedStudent.kenapa}</span>
                  </div>
                  <div className="detail-item full-width">
                    <label>Harapan:</label>
                    <span>{selectedStudent.harapan}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;