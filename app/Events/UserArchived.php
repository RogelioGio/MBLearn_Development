<?php

namespace App\Events;

use App\Models\UserInfos;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserArchived implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(public string $adder, public UserInfos $affected)
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('Users'),
        ];
    }

    public function broadcastWith(): array{
        $archivedusers = UserInfos::query()->where('status', '=', 'Inactive')
        ->with('roles','division','section','department','title','branch','city','userCredentials')
        ->orderBy('created_at', 'desc')
        ->paginate();

        $activeusers = UserInfos::query()->where('status', '=', 'Active')->whereDoesntHave('userCredentials', function(Builder $query){
            $query->where('MBemail', $this->adder);
        })
        ->with('roles','division','section','department','title','branch','city','userCredentials')
        ->orderBy('created_at', 'desc')
        ->paginate();
        return [
            "systemadmin" => $this->adder,
            "affected" => $this->affected, 
            "archivedUsers" => $archivedusers,
            "activeUsers" => $activeusers
        ];
    }

    public function broadcastAs(): string {
        return "User-Archived";
    }
}
