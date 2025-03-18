"use client";

import { FirebaseOptions, getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from "firebase/database"; // Importe 'update'
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function EmbedPage() {
  // Removi a tipagem de params aqui para simplificar, mas você pode mantê-la se precisar
  const { id } = useParams();
  const [currentSound, setCurrentSound] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!id || !lastInteraction) return; // Garante que 'id' exista antes de criar a referência

    const embedRef = ref(db, `embed/${id}`);

    const unsubscribe = onValue(embedRef, (snapshot) => {
      if (snapshot.exists()) {
        const embedData = snapshot.val();

        if (embedData.toPlay) {
          const shouldPlay =
            embedData.playing &&
            (embedData.toPlay.url !== currentSound || !isPlaying);

          setCurrentSound(embedData.toPlay.url);
          setIsPlaying(embedData.playing === true);

          if (shouldPlay && audioRef.current) {
            const audioElement = audioRef.current;
            audioElement.src = embedData.toPlay.url;
            audioElement.play().catch((error) => {
              console.error("Erro ao reproduzir áudio:", error);
            });
            audioElement.onended = async () => {
              setIsPlaying(false);
              const soundboardRef = ref(db, `embed/${id}`);
              await update(soundboardRef, {
                playing: false,
              });
            };
          }
        } else {
          setIsPlaying(false);
          setCurrentSound(null); // Limpa o som atual se toPlay não existir
        }
      } else {
        console.log(`Soundboard com ID ${id} não encontrado.`);
        setIsPlaying(false);
        setCurrentSound(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [id, lastInteraction, currentSound, isPlaying]);

  // Registrar interação do usuário
  const handleInteraction = () => {
    setLastInteraction(true);
  };

  return (
    <main
      className="flex flex-col items-center justify-center h-screen"
      onClick={handleInteraction}
    >
      <div className="p-5 max-w-3xl mx-auto">
        <h1 className="text-2xl font-syne font-medium mb-4">
          Soundboard Embed
        </h1>

        {!lastInteraction && (
          <p className="text-sm text-amber-500 mb-4">
            Important: Click anywhere on this page before using. Google Chrome
            blocks audio from pages that haven't been interacted with.
          </p>
        )}

        <div className="border rounded-lg p-4 mb-6 bg-secondary/50">
          <h2 className="text-lg font-medium mb-2">
            How to use this embed in your stream
          </h2>
          <ol className="space-y-3 text-muted-foreground">
            <li>1. Open this page in a separate browser tab.</li>
            <li>
              2. In your broadcasting software (OBS, Streamlabs, etc.), add a
              new <strong>Window Capture</strong> source.
            </li>
            <li>3. Select this browser window/tab from the dropdown menu.</li>
            <li>
              4. Make sure to enable <strong>"Capture Audio"</strong> in the
              source properties.
            </li>
            <li>
              5. Adjust the capture area as needed to fit your stream layout.
            </li>
            <li>
              6. You can now trigger sounds from this page and they will play
              through your stream.
            </li>
          </ol>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          {lastInteraction
            ? `Listening for sound updates for soundboard ID: ${id}...`
            : "Your soundboard will appear here when configured properly."}
        </div>
      </div>

      <audio ref={audioRef} style={{ display: "none" }} />
    </main>
  );
}
