import tkinter as tk
from tkinter import scrolledtext, messagebox
import requests
import threading

# CONFIGURATION
API_URL = "http://localhost:3000/api/quick-publish" # Change to production URL when live
API_KEY = "sw_secure_secret_7d7b56bd" # Matches CRON_SECRET in .env

class QuickPublishApp:
    def __init__(self, root):
        self.root = root
        self.root.title("SentientWire - Quick Publish")
        self.root.geometry("650x650") # Increased height for better visibility
        self.root.configure(bg="#020408")
        self.root.resizable(True, True)
        
        # Header
        header_frame = tk.Frame(root, bg="#0a0f18", height=70)
        header_frame.pack(fill="x")
        
        tk.Label(
            header_frame, 
            text="SENTIENTWIRE AI PUBLISH", 
            font=("Courier New", 16, "bold"), 
            bg="#0a0f18", 
            fg="#06b6d4"
        ).pack(pady=20)

        # Content Area
        main_frame = tk.Frame(root, bg="#020408", padx=25, pady=10)
        main_frame.pack(fill="both", expand=True)

        tk.Label(
            main_frame, 
            text="HABER METNİNİ VEYA KONUSUNU BURAYA YAPIŞTIRIN:", 
            font=("Courier New", 10, "bold"), 
            bg="#020408", 
            fg="#94a3b8"
        ).pack(anchor="w", pady=(0, 10))

        # Text area with a more reasonable initial height
        self.text_area = scrolledtext.ScrolledText(
            main_frame, 
            wrap=tk.WORD, 
            bg="#080f1c", 
            fg="#f0f9ff", 
            insertbackground="white",
            font=("Inter", 11),
            borderwidth=1,
            highlightthickness=1,
            highlightcolor="#06b6d4",
            highlightbackground="#1e293b",
            height=18 # Reduced fixed height to ensure button space
        )
        self.text_area.pack(fill="both", expand=True, pady=(0, 15))

        # Bottom section for button and status
        bottom_frame = tk.Frame(main_frame, bg="#020408")
        bottom_frame.pack(fill="x", side="bottom", pady=10)

        # Status Label
        self.status_label = tk.Label(
            bottom_frame, 
            text="SİSTEM AKTİF: HABER BEKLENİYOR", 
            font=("Courier New", 9, "bold"), 
            bg="#020408", 
            fg="#475569"
        )
        self.status_label.pack(pady=(0, 15))

        # Publish Button
        self.publish_btn = tk.Button(
            bottom_frame, 
            text="AI İLE DÜZENLE VE YAYINLA", 
            command=self.start_publish,
            bg="#06b6d4", 
            fg="#020408", 
            font=("Courier New", 11, "bold"),
            activebackground="#22d3ee",
            borderwidth=0,
            cursor="hand2",
            padx=20,
            pady=15
        )
        self.publish_btn.pack(fill="x")

    def start_publish(self):
        text_content = self.text_area.get("1.0", tk.END).strip()
        if not text_content:
            messagebox.showwarning("Uyarı", "Lütfen önce bir içerik yapıştırın.")
            return

        self.publish_btn.config(state="disabled", text="İŞLENİYOR...", bg="#1e293b", fg="#94a3b8")
        self.status_label.config(text="AI MOTORU ARAŞTIRMA YAPIYOR VE ÇEVİRİYOR...", fg="#06b6d4")
        
        # Run in thread to keep GUI responsive
        threading.Thread(target=self.publish_task, args=(text_content,), daemon=True).start()

    def publish_task(self, text):
        payload = {
            "text": text,
            "apiKey": API_KEY
        }

        try:
            # Increased timeout for deep AI processing
            response = requests.post(API_URL, json=payload, timeout=180)
            if response.status_code == 200:
                self.root.after(0, lambda: self.finish_publish(True, "Haber başarıyla düzenlendi, görselleri eklendi ve 9 dilde yayınlandı!"))
            else:
                error_data = response.json()
                error_msg = error_data.get('error', response.text)
                self.root.after(0, lambda: self.finish_publish(False, f"Hata: {error_msg}"))
        except Exception as e:
            self.root.after(0, lambda: self.finish_publish(False, f"Bağlantı Hatası: {str(e)}\n\nLütfen yerel sunucunun (npm run dev) açık olduğundan emin olun."))

    def finish_publish(self, success, message):
        self.publish_btn.config(state="normal", text="AI İLE DÜZENLE VE YAYINLA", bg="#06b6d4", fg="#020408")
        self.status_label.config(text="SİSTEM AKTİF: YENİ HABER BEKLENİYOR", fg="#475569")
        
        if success:
            messagebox.showinfo("Başarılı", message)
            self.text_area.delete("1.0", tk.END)
        else:
            messagebox.showerror("Hata", message)

if __name__ == "__main__":
    root = tk.Tk()
    # Attempt to set icon if exists
    try:
        root.iconphoto(False, tk.PhotoImage(file='public/logo.png'))
    except:
        pass
    app = QuickPublishApp(root)
    root.mainloop()
